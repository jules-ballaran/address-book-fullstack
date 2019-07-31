import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import axios from 'axios'
import {
	AppBar,
	Toolbar,
	Paper,
	Grid,
	Tooltip,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Dialog,
	TextField,
	Button,
} from '@material-ui/core'
import { AccountCircle, ExitToApp, PersonAdd, Delete, Add } from '@material-ui/icons/'
import AddContact from './components/AddContact'
import ViewContact from './components/ViewContact'

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
	},
	sort: {
		width: 200,
		margin: '8px 58px',
	}
})

export default function AddressBook(props) {
	const classes = useStyles()
	const { user, setUser, history } = props
	const [addDialog, setAddDialog] = useState(false)
	const [viewDialog, setViewDialog] = useState(false)
	const [contacts, setContacts] = useState([])
	const [sort, setSort] = useState('first_name')
	const [type, setType] = useState('')
	const [contact, setContact] = useState([])
	const [group, setGroup] = useState('all')
	const [addGroup, setAddGroup] = useState(false)
	const [groupName, setGroupName] = useState('')

	useEffect(()=>{
		if(!user.token){
			history.push('/login')
		} else {
			axios
				.get(`http://localhost:3001/api/contacts/users/${user.id}`)
				.then(res => setContacts(res.data))
				.catch(err => console.error(err))
		}
	}, [])

	const handleLogout = () => {
		localStorage.setItem('userAB', JSON.stringify({}))
		setUser({})
		history.push('/login')
	}

	const handleDelete = (e, id)=> {
		e.stopPropagation() 
		axios
			.delete(`http://localhost:3001/api/contacts/delete/${id}`)
			.then(res => {
				setContacts(contacts.filter(contact => res.data[0].id !== parseInt(contact.id)))
			})
			.catch(err => console.error(err))
	}

	const handleSort = e => {
		setSort(e.target.value)
		axios
			.get(`http://localhost:3001/api/contacts/users/${user.id}?sort=${e.target.value}`)
			.then(res => setContacts(res.data))
			.catch(err => console.error(err))
	}

	const handleGroup = e => {
		setGroup(e.target.value)
	}

	const handleAddGroup = () => {
		console.log(groupName, user.id)
	}

	const handleView = (contact) => {
		setContact(contact)
		setTimeout(() => {
			setViewDialog(true)
		}, 100)
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
							<PersonAdd 
								onClick={()=>setAddDialog(true)}
							/>
						</Tooltip>
						<Tooltip title="Logout">
							<ExitToApp onClick={handleLogout}/>
						</Tooltip>
					</Grid>
				</Toolbar>
			</AppBar>
			<Grid container alignItems="center">
				<FormControl className={classes.sort}>
					<InputLabel htmlFor="sort">Sort</InputLabel>
	        <Select
	        	value={sort}
	        	onChange={e => handleSort(e)}
	          inputProps={{
	            id: 'sort',
	          }}
	        >
	          <MenuItem value="first_name">First Name</MenuItem>
	          <MenuItem value="last_name">Last Name</MenuItem>
	        </Select>
				</FormControl>
				<FormControl className={classes.sort}>
					<InputLabel htmlFor="group">Groups</InputLabel>
	        <Select
	        	value={group}
	        	onChange={e => handleGroup(e)}
	          inputProps={{
	            id: 'group',
	          }}
	        >
	          <MenuItem value="all">All</MenuItem>
	        </Select>
				</FormControl>
				<Add style={{margin: '12px 0 0 -50px', fontSize: 30}} onClick={()=>setAddGroup(true)}/>
			</Grid>
			<Grid container style={{margin: '0 50px'}}>
				{contacts.map(contact => (
					<Paper key={contact.id} className={classes.item} 
						onClick={()=>handleView(contact)}
					>
						<Grid 
							container 
							direction="row"
							alignItems="center"
							style={{height: '100%'}}
						>
							<AccountCircle style={{fontSize: 60, margin: '0 16px'}}/>
							<div>
								<p>{contact.first_name} {contact.last_name}</p>
								<p>Homephone: {contact.home_phone}</p>
							</div>
							<Delete style={{margin: '0 8px 0 auto'}}onClick={(e)=>handleDelete(e, contact.id)}/>
						</Grid>
					</Paper>
				))}
				<AddContact 
					addDialog={addDialog}
					setAddDialog={setAddDialog}
					user={user}
					contacts={contacts}
					setContacts={setContacts}
				/>
				<Dialog open={addGroup} onClose={() => setAddGroup(false)}>
					<TextField 
						label="Add Group"
						margin="normal"
		        variant="outlined"
		        style={{margin: 20}}
		        value={groupName}
		        onChange={e=> setGroupName(e.target.value)}
					/>
					<Button variant="contained" color="primary" style={{margin: '0 20px 20px 20px'}} onClick={handleAddGroup}>Add</Button>
				</Dialog>
				{viewDialog ? 
					<ViewContact
						viewDialog={viewDialog}
						setViewDialog={setViewDialog}
						user={user}
						contacts={contacts}
						setContacts={setContacts}
						contact={contact}
					/>
				: null
				}
			</Grid>
		</div>
	)
}