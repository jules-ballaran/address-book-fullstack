const express = require('express')
const massive = require('massive')
const cors = require('cors')
const users = require('./controllers/users.js')
const contacts = require('./controllers/contacts.js')
const group = require('./controllers/group.js')

const jwt = require('jsonwebtoken')
const secret = require('../secret.js')

massive({
	host: 'localhost',
	port: 5432,
	database: 'address_book',
	user: 'postgres',
	password: 'address_book'
}).then(db => {
	const app = express()

	app.set('db', db)
	app.use(express.json())
	app.use(cors())

	const auth = (req, res, next) => {
		if(!req.headers.authorization) {
			return res.status(401).end()
		}
		try {
			const token = req.headers.authorization.split(' ')[1];
			jwt.verify(token, secret)
			next()
		} catch (err) {
			console.error(err)
			res.status(401).end()
		}
	}

	app.post('/api/signup', users.signup)
	app.post('/api/login', users.login)

	app.use(auth)

	app.post('/api/contacts/create', contacts.create)
	app.get('/api/contacts/users/:id', contacts.list)
	app.delete('/api/contacts/delete/:id', contacts.delete)
	app.patch('/api/contacts/edit/:id', contacts.edit)

	app.post('/api/group/create', group.create)
	app.get('/api/group/list/:id', group.list)
	app.post('/api/group/add', group.add)

	const PORT = 3001
	app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`)
	})
})