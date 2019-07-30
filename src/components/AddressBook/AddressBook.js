import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
	AppBar,
	Toolbar,
	Paper,
	Grid,
	Tooltip,
} from '@material-ui/core'
import { AccountCircle, ExitToApp, PersonAdd, Delete } from '@material-ui/icons/'
import AddContact from './components/AddContact'

const useStyles = makeStyles({
	div: {
		background: 'whitesmoke',
		minHeight: '100vh',
	},
	item: {
		flex: '1 100% auto',
		minWidth: 350,
		maxWidth: 350,
		height: 100,
		margin: 10,
	}
})

export default function AddressBook(props) {
	const classes = useStyles()
	const { user, setUser, history } = props
	const [addDialog, setAddDialog] = useState(false)

	useEffect(()=>{
		if(!user.token){
			history.push('/login')
		}
	}, [])

	const handleLogout = () => {
		localStorage.setItem('userAB', JSON.stringify({}))
		setUser({})
		history.push('/login')
	}

	return (
		<div className={classes.div}>
			<AppBar position="static">
				<Toolbar>
					<Grid container>
					<h3>Address Book</h3>
					</Grid>
					<Grid container justify="flex-end">
						<Tooltip title="Add Contact" style={{margin: '0 10px'}}>
							<PersonAdd onClick={()=>setAddDialog(true)}/>
						</Tooltip>
						<Tooltip title="Logout">
							<ExitToApp onClick={handleLogout}/>
						</Tooltip>
					</Grid>
				</Toolbar>
			</AppBar>
			<Grid container>
				<Paper className={classes.item}>
					<Grid 
						container 
						direction="row"
						alignItems="center"
						style={{height: '100%'}}
					>
						<AccountCircle style={{fontSize: 60, margin: '0 16px'}}/>
						<div>
							<p>name</p>
							<p>email</p>
						</div>
						<Delete style={{marginLeft: 'auto'}}/>
					</Grid>
				</Paper>
				<AddContact 
					addDialog={addDialog}
					setAddDialog={setAddDialog}
				/>
			</Grid>
		</div>
	)
}