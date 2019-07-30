const express = require('express')
const massive = require('massive')
const cors = require('cors')
const users = require('./controllers/users.js')

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

	app.post('/api/signup', users.signup)
	app.post('/api/login', users.login)

	const PORT = 3001
	app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`)
	})
})