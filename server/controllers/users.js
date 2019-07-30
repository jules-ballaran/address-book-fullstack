const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const secret = require('../../secret.js')

module.exports = {
	signup: (req, res) => {
		const db = req.app.get('db')
		const { username, password, fname, lname } = req.body

		db.users
			.findOne({username})
			.then(user => {
				if(user){
					throw new Error('Username already taken')
				}
				return argon2
					.hash(password)
					.then(hash => {
						return db.users.insert(
							{
								username,
								password: hash,
								fname,
								lname,
							}, 
							{
								fields: ['id', 'username', 'fname', 'lname']
							}
						)
					})
					.then(user => {
						const token = jwt.sign({ userId: user.id}, secret)
						res.status(201).json({...user, token})
						db.address_book.save({ userid: user.id})
					})
					.catch(err => {
						console.error(err)
						res.status(500).end()
					})
			})
			.catch(err => {
				if(['Username already taken'].includes(err.message)){
					res.status(200).json({ userErr: err.message})
				} else {
					console.error(err)
					res.status(500).end()
				}
			})
	},
	login: (req, res) => {
		const db = req.app.get('db')
		const { username, password } = req.body

		db.users
			.findOne(
				{
					username,
				},
				{
					fields: ['id', 'username', 'password', 'fname', 'lname'],
				}
			)
			.then(user => {
				if(!user) {
					throw new Error('Invalid username')
				}
				return argon2.verify(user.password, password).then(valid => {
					if(!valid){
						throw new Error('Incorrect password')
					}

					const token = jwt.sign({ userId: user.id }, secret)
					delete user.password
					res.status(200).json({...user, token })
				})
			})
			.catch(err => {
				if(['Invalid username'].includes(err.message)){
					res.status(200).json({ userErr: err.message })
				} else if(['Incorrect password'].includes(err.message)){
					res.status(200).json({ passErr: err.message })
				} else {
					console.error(err)
					res.status(500).end()
				}
			})
	},
}