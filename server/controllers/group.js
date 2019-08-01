module.exports = {
	create: (req, res) => {
		const db = req.app.get('db')

		const { userid, name } = req.body

		db.group_name
			.save({
				userid,
				name,
			})
			.then(group => res.status(201).json(group))
			.catch(err => {
				res.status(500).end()
			})
	},
	list: (req, res) => {
		const db = req.app.get('db')
		db.group_name
			.find({userid: req.params.id})
			.then(groups => res.status(200).json(groups))
			.catch(err => {
				res.status(500).end()
			})
	},
	add: (req, res) => {
		const db = req.app.get('db')
		const { groupid, contactid, name } = req.body
		db.group_list
			.findOne({ groupid, contactid })
			.then(out => {
				if(out) {
					res.status(200).json({msg: `Already add on ${name}`})
				} else {
					db.group_list
						.insert({ groupid, contactid }, { fields: ['groupid', 'contactid'] })
						.then(out => res.status(201).json({msg: `Add to ${name}`}))
						.catch(err => {
							res.status(500).end()
						})
				}
			})
			.catch(err => {
				res.status(500).end()
			})	
	}
}