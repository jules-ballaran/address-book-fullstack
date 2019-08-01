import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'
import AddressBook from './components/AddressBook/AddressBook'
import auth from './components/auth'

export default function Routes(props) {
	const { user, setUser } = props

	return (
		<Switch>
			<Route exact path='/'
				render={(props)=> <AddressBook {...props} user={user} setUser={setUser}/>
				}
			/>
			<Route path='/login' 
				render={(props)=> <Login {...props} user={user} setUser={setUser}/>
				}
			/>
			<Route path='/register'
				render={(props)=> <Register {...props} user={user} setUser={setUser}/>}
			/>
			<Route path='/auth' component={auth}/>
		</Switch>
	)
}