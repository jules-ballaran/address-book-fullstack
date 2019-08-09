import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import axios from 'axios'
import {
	Dialog,
	TextField,
	Grid,
	Button,
} from '@material-ui/core'
import Close from '@material-ui/icons/Close'

const useStyles = makeStyles({
	textCont: {
		padding: '0 8px',
	}
})

export default function AddContact(props){
	const classes = useStyles()
	const { addDialog, setAddDialog, user, contacts, setContacts, config } = props
	const [contact, setContact] = useState({
		first_name: '',
		last_name: '',
		home_phone: '',
		mobile_phone: '',
		work_phone: '',
		email: '',
		city: '',
		state_or_province: '',
		postal_code: '',
		country: '',
	})

	const handleAddContact = e => {
		e.preventDefault()
		axios
			.post('http://localhost:3001/api/contacts/create', {
				userid: user.id,
				...contact
			}, config)
			.then(res => {
				setContacts([...contacts, res.data])
				setAddDialog(false)
				setContact({
					first_name: '',
					last_name: '',
					home_phone: '',
					mobile_phone: '',
					work_phone: '',
					email: '',
					city: '',
					state_or_province: '',
					postal_code: '',
					country: '',
				})
			})
			.catch(err => {
				console.error(err)
				if(err.response.status === 401){
					props.history.push('/auth')
				}
			})
	}

	const handleEditToggle = () => {
		console.log('test')
	}

	return (
		<Dialog open={addDialog} onClose={()=>setAddDialog(false)} style={{padding: 8}}>
			<form onSubmit={e => handleAddContact(e)}>
			<div style={{background: '#3f51b5', padding: 16}}>
        <Grid container>
					<h3 style={{color: 'white', margin: 0, padding: 0}}>Add Contact</h3>
          <Close
            style={{color: 'white', marginLeft: 'auto', cursor: 'pointer'}}
						onClick={()=>setAddDialog(false)}
          />
        </Grid>
      </div>
			<Grid container direction="column" style={{padding: 16}}>
				<Grid container item md={12}>
					<Grid item md={6} xs={12} className={classes.textCont}>
						<TextField
							required
							margin="normal"
							label="First Name"
							margin="normal"
			        variant="outlined"
			        fullWidth
			        value={contact.first_name}
			        onChange={e=>setContact({...contact, first_name: e.target.value})}
						/>
					</Grid>
					<Grid item md={6} xs={12} className={classes.textCont}>
						<TextField
							required
							label="Last Name"
							margin="normal"
			        variant="outlined"
			        fullWidth
			        value={contact.last_name}
			        onChange={e=>setContact({...contact, last_name: e.target.value})}
						/>
					</Grid>
				</Grid>

				<Grid container item md={12}>
					<Grid item md={4} xs={12} className={classes.textCont}>
						<TextField
							label="Home Phone"
							margin="normal"
			        variant="outlined"
			        fullWidth
			        value={contact.home_phone}
			        onChange={e=>setContact({...contact, home_phone: e.target.value})}
						/>
					</Grid>
					<Grid item md={4} xs={12} className={classes.textCont}>
						<TextField
							label="Mobile Phone"
							margin="normal"
			        variant="outlined"
			        fullWidth
			        value={contact.mobile_phone}
			        onChange={e=>setContact({...contact, mobile_phone: e.target.value})}
						/>
					</Grid>
					<Grid item md={4} xs={12} className={classes.textCont}>
						<TextField
							label="Work Phone"
							margin="normal"
			        variant="outlined"
			        fullWidth
			        value={contact.work_phone}
			        onChange={e=>setContact({...contact, work_phone: e.target.value})}
						/>
					</Grid>
				</Grid>

				<Grid container item md={12} className={classes.textCont}>
					<TextField
						label="Email"
						margin="normal"
		        variant="outlined"
		        fullWidth
		        value={contact.email}
		        onChange={e=>setContact({...contact, email: e.target.value})}
					/>
				</Grid>

				<Grid container item md={12}>
					<Grid item md={6} xs={12} className={classes.textCont}>
						<TextField
							label="City"
							margin="normal"
			        variant="outlined"
			        fullWidth
			        value={contact.city}
			        onChange={e=>setContact({...contact, city: e.target.value})}
						/>
					</Grid>
					<Grid item md={6} xs={12} className={classes.textCont}>
						<TextField
							label="State or Province"
							margin="normal"
			        variant="outlined"
			        fullWidth
			        value={contact.state_or_province}
			        onChange={e=>setContact({...contact, state_or_province: e.target.value})}
						/>
					</Grid>
				</Grid>

				<Grid container item md={12}>
					<Grid item md={6} xs={12} className={classes.textCont}>
						<TextField
							label="Postal Code"
							margin="normal"
			        variant="outlined"
			        fullWidth
			        value={contact.postal_code}
			        onChange={e=>setContact({...contact, postal_code: e.target.value})}
						/>
					</Grid>
					<Grid item md={6} xs={12} className={classes.textCont}>
						<TextField
							label="Country"
							margin="normal"
			        variant="outlined"
			        fullWidth
			        value={contact.country}
			        onChange={e=>setContact({...contact, country: e.target.value})}
						/>
					</Grid>
				</Grid>
				<Button
					style={{margin: 8, color: '#3f51b5', border: '1px solid #3f51b5'}}
					type="submit"
					>
						add contact
					</Button>
			</Grid>
			</form>
		</Dialog>
	)
}
