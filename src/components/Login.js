import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
	Grid,
	TextField,
	Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { LockOutlined } from '@material-ui/icons/'
const useStyles = makeStyles({
	register: {
		marginLeft: 'auto',
		'& a': {
			textDecoration: 'none',
			color: '#3f51b5',
		}
	},
	signInBtn: {
		margin: '8px 0'
	},
	form: {
		marginTop: 64,
		width: '20%', 
		minWidth: 420
	},
	lockLogo: {
		padding: 8,
		background: '#3f51b5',
		color: 'white',
		borderRadius: '50%'
	}
})

export default function Login(props) {
	const classes = useStyles()
	const { user, setUser, history } = props
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [userError, setUserError] = useState(false)
	const [passError, setPassError] = useState(false)

	useEffect(()=>{
		if(user.token){
			props.history.push('/')
		}
	}, [])

	const handleLogin = e => {
		e.preventDefault()
		axios
			.post('http://localhost:3001/api/login', {
				username,
				password,
			})
			.then(res => {
				if(res.data.userErr) {
					setUserError(true)
				} else {
					setUserError(false)
				}
				if(res.data.passErr) {
					setPassError(true)
				} else {
					setPassError(false)
				}
				if(res.data.token){
					setUser(res.data)
					localStorage.setItem('userAB', JSON.stringify(res.data))
					history.push('/')
				}
			})
	}

	return (
		<Grid container justify="center">
			<form className={classes.form} onSubmit={e => handleLogin(e)}>
				<Grid
					container
					direction="column"
					justify="center"
					alignItems="center"
				>	
					<LockOutlined className={classes.lockLogo}/>
					<h1 style={{fontWeight: 'normal'}}>Sign in</h1>
					<TextField 
						required
						label="Username"
						margin="normal"
		        variant="outlined"
		        fullWidth
						value={username}
						onChange={e=>setUsername(e.target.value)}
						error={userError}
		        helperText={userError ? 'Invalid username' : ''}
					/>
					<TextField 
						required
						label="Password"
						margin="normal"
		        variant="outlined"
		        type="password"
		        fullWidth
		        value={password}
						onChange={e=>setPassword(e.target.value)}
						error={passError}
		        helperText={passError ? 'Invalid password' : ''}
					/>
					<Button 
						className={classes.signInBtn}
						variant="contained" 
						color="primary" 
						type="submit" 
						fullWidth 
						size="large"
					>
						SIGN IN
					</Button>
					<div className={classes.register}>
						<Link to='/register'>Don't have an account? Sign Up</Link>
					</div>
				</Grid>
			</form>
		</Grid>
	)
}