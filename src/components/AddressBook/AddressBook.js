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
	Menu,
	MenuItem,
	Dialog,
	TextField,
	Button,
} from '@material-ui/core'
import { Contacts, ExitToApp, PersonAdd, Delete, Add, GroupAdd, ContactPhone } from '@material-ui/icons/'
import AddContact from './components/AddContact'
import ViewContact from './components/ViewContact'
import AddToGroup from './components/AddToGroup'
import ContactDisplay from './components/ContactDisplay'

const useStyles = makeStyles({
	div: {
		background: 'whitesmoke',
		minHeight: '100vh',
	},
	item: {
		flex: '1 100% auto',
		minWidth: 300,
		height: 100,
		margin: 10,
	},
	sort: {
		width: 200,
		margin: '8px 8px 8px 58px',
	},
	search: {
		width: 200,
		margin: '0 0 0 58px'
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
	const [groupList, setGroupList] = useState([{id: 'all', name: 'All'}])
	const [search, setSearch] = useState('')

	const [anchorEl, setAnchorEl] = useState(null)

	const [config, setConfig] = useState('')

	useEffect(()=>{
		if(!user.token){
			history.push('/login')
		} else {
			const head = `Bearer ${user.token}`
			setConfig({
				headers: {authorization: head}
			})

			axios
				.get(`http://localhost:3001/api/contacts/users/${user.id}`, {headers : {authorization: head}})
				.then(res => setContacts(res.data))
				.catch(err => {
				console.error(err)
					if(err.response.status === 401){
						history.push('/auth')
					}
				})
			axios
				.get(`http://localhost:3001/api/group/list/${user.id}`, {headers : {authorization: head}})
				.then(res => setGroupList([...groupList, ...res.data]))
				.catch(err => {
				console.error(err)
					if(err.response.status === 401){
						history.push('/auth')
					}
				})
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
			.delete(`http://localhost:3001/api/contacts/delete/${id}`, config)
			.then(res => {
				setContacts(contacts.filter(contact => res.data[0].id !== parseInt(contact.id)))
			})
			.catch(err => {
				console.error(err)
				if(err.response.status === 401){
					history.push('/auth')
				}
			})
	}

	const handleSort = e => {
		setSort(e.target.value)
		axios
			.get(`http://localhost:3001/api/contacts/users/${user.id}?sort=${e.target.value}&group=${group}`, config)
			.then(res => setContacts(res.data))
			.catch(err => {
				console.error(err)
				if(err.response.status === 401){
					history.push('/auth')
				}
			})
	}

	const handleGroup = e => {
		setGroup(e.target.value)
		axios
			.get(`http://localhost:3001/api/contacts/users/${user.id}?sort=${sort}&group=${e.target.value}`, config)
			.then(res => setContacts(res.data))
			.catch(err => {
				console.error(err)
				if(err.response.status === 401){
					history.push('/auth')
				}
			})
	}

	const handleAddGroup = () => {
		axios
			.post('http://localhost:3001/api/group/create', {
				userid: user.id,
				name: groupName, },
				config
			)
			.then(res => {
				setGroupList([...groupList, res.data])
				setAddGroup(false)
			})
			.catch(err => {
				console.error(err)
				if(err.response.status === 401){
					history.push('/auth')
				}
			})
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
					<Grid container justify="center">
					<h4>Logged in as {user.fname} {user.lname}</h4>
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
			<Grid container item alignItems="center">
				<Grid>
					<TextField 
						className={classes.search}
						label="Search"
						value={search}
						onChange={e => setSearch(e.target.value)}
					/>
				</Grid>
				<Grid>
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
				</Grid>
				<Grid>
					<FormControl className={classes.sort}>
						<InputLabel htmlFor="group">Groups</InputLabel>
		        <Select
		        	value={group}
		        	onChange={e => handleGroup(e)}
		          inputProps={{
		            id: 'group',
		          }}
		        >
		          {groupList.map((glist, i) => (
		          	<MenuItem key={i} value={glist.id}>{glist.name}</MenuItem>
		          ))}
		        </Select>
					</FormControl>
					<Add style={{marginTop: 25, fontSize: 30}} onClick={()=>setAddGroup(true)}/>
				</Grid>
			</Grid>
			<Grid container style={{padding: '0 50px'}}>
				{contacts.map(contact => (
					<ContactDisplay 
						contact={contact}
						classes={classes}
						handleView={handleView}
						setContact={setContact}
						setAnchorEl={setAnchorEl}
						handleDelete={handleDelete}
						search={search}
					/>
				))}
			</Grid>
			<AddContact 
				addDialog={addDialog}
				setAddDialog={setAddDialog}
				user={user}
				contacts={contacts}
				setContacts={setContacts}
				config={config}
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
					config={config}
				/>
			: null
			}
			<AddToGroup 
				anchorEl={anchorEl}
				setAnchorEl={setAnchorEl}
				groupList={groupList}
				contact={contact}
				config={config}
			/>
		</div>
	)
}