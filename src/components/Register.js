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
	signin: {
		marginLeft: 'auto',
		'& a': {
			textDecoration: 'none',
			color: '#3f51b5',
		}
	},
	signUpBtn: {
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
	},
})

export default function Register(props) {
	const classes = useStyles()
	const { user, setUser, history } = props
	const [fname, setFname] = useState('')
	const [lname, setLname] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [userError, setUserError] = useState(false)

	useEffect(()=>{
		if(user.token){
			history.push('/')
		}
	},[])

	const handleSignUp = e => {
		e.preventDefault()
		axios
			.post('http://localhost:3001/api/signup', {
				username,
				password,
				fname,
				lname,
			})
			.then(res => {
				if(res.data.userErr){
					setUserError(true)
				} else {
					setUser(res.data)
					localStorage.setItem('userAB', JSON.stringify(res.data))
					history.push('/')
				}
			})
	}

	return (
		<Grid container justify="center">
			<form className={classes.form} onSubmit={e => handleSignUp(e)}>
				<Grid
					container
					direction="column"
					justify="center"
					alignItems="center"
				>	
					<LockOutlined className={classes.lockLogo}/>
					<h1 style={{fontWeight: 'normal'}}>Sign up</h1>
					<Grid container justify="space-between">
						<TextField 
							required
							label="First Name"
							margin="normal"
			        variant="outlined"
			        value={fname}
			        onChange={e => setFname(e.target.value)}
						/>
						<TextField 
							required
							label="Last Name"
							margin="normal"
			        variant="outlined"
			        value={lname}
			        onChange={e => setLname(e.target.value)}
						/>
					</Grid>
					<TextField 
						required
						label="Username"
						margin="normal"
		        variant="outlined"
		        fullWidth
		        value={username}
		        onChange={e => setUsername(e.target.value)}
		        error={userError}
		        helperText={userError ? 'Username is already taken' : ''}
					/>
					<TextField 
						required
						label="Password"
						margin="normal"
		        variant="outlined"
		        type="password"
		        fullWidth
		        value={password}
		        onChange={e => setPassword(e.target.value)}
					/>
					<Button 
						className={classes.signUpBtn}
						variant="contained" 
						color="primary" 
						type="submit" 
						fullWidth 
						size="large"
					>
						SIGN UP
					</Button>
					<div className={classes.signin}>
						<Link to='/login'>Already have an account? Sign in</Link>
					</div>
				</Grid>
			</form>
		</Grid>
	)
}