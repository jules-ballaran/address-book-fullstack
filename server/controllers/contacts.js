module.exports = {
	create: (req, res) => {
		const db = req.app.get('db')
		const {
			userid,
			first_name, 
			last_name, 
			home_phone, 
			mobile_phone,
			work_phone,
			email,
			city,
			state_or_province,
			postal_code,
			country,
		} = req.body

		db.address_book
			.findOne({userid})
			.then(ab => {
				db.contact.save({
					bookid: ab.id,
					first_name, 
					last_name, 
					home_phone, 
					mobile_phone,
					work_phone,
					email,
					city,
					state_or_province,
					postal_code,
					country,
				})
				.then(cont => res.status(201).json(cont))
				.catch(err => {
					res.status(500).end()
				})
			})
			.catch(err => {
				res.status(500).end()
			})
	},
	list: (req, res) => {
		const db = req.app.get('db')
		const { sort, group } = req.query

		if(group && group !== 'all'){
			db.query(`SELECT contact.id as id, bookid, first_name, last_name, home_phone, 
								mobile_phone, work_phone, email, city, state_or_province, postal_code, country
								FROM group_name, group_list, contact, users 
								WHERE users.id=group_name.userid 
								AND group_list.groupid=group_name.id 
								AND contact.id=group_list.contactid 
								AND users.id=${req.params.id}
								AND group_name.id=${group}
								ORDER BY ${sort} ASC`
				)
				.then(test => res.status(200).json(test))
		} else {
			db.address_book
				.findOne({userid: req.params.id})
				.then(ab => {
					if(sort) {
						db.contact
						.find({bookid: ab.id}, {
							order: [
								{field: sort, direction: "asc"}
							]
						})
						.then(cont => res.status(200).json(cont))
						.catch(err => {
							res.status(500).end()
						})
					} else {
						db.contact
							.find({bookid: ab.id})
							.then(cont => res.status(200).json(cont))
							.catch(err => {
								res.status(500).end()
							})
					}
				})
				.catch(err => {
					res.status(500).end()
				})
		}
	},
	delete: (req, res) => {
		const db = req.app.get('db')
		db.group_list.destroy({contactid: req.params.id})
			.then(()=>{
				db.contact.destroy({id: req.params.id})
					.then(cont => res.status(200).json(cont))
					.catch(err => {
						res.status(500).end()
					})
			})
	},
	edit: (req, res) => {
		const db = req.app.get('db')
		const {
			first_name, 
			last_name, 
			home_phone, 
			mobile_phone,
			work_phone,
			email,
			city,
			state_or_province,
			postal_code,
			country,
		} = req.body

		db.contact
			.update({
				id : req.params.id				
			}, {
				first_name, 
				last_name, 
				home_phone, 
				mobile_phone,
				work_phone,
				email,
				city,
				state_or_province,
				postal_code,
				country,
			})
			.then(cont => res.status(201).json(cont))
			.catch(err => {
				res.status(500).end()
			})
	}
}