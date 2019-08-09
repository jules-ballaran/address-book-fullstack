import React, { useState, useEffect } from 'react'
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
	const { viewDialog, setViewDialog, user, contact, contacts, setContacts, config } = props
	const [editCont, setEditCont] = useState({
		...contact
	})

	const handleEditContact = e => {
		e.preventDefault()
		axios
			.patch(`http://localhost:3001/api/contacts/edit/${contact.id}`, {
				...editCont
			}, config)
			.then(res => {
				const index = contacts.findIndex(cont => res.data[0].id === cont.id)
				contacts.splice(index, 1, res.data[0])
				setContacts(contacts)
				setViewDialog(false)
			})
			.catch(err => {
				console.error(err)
				if(err.response.status === 401){
					props.history.push('/auth')
				}
			})
	}

	return (
		<Dialog open={viewDialog} onClose={()=>setViewDialog(false)} style={{padding: 8}}>
			<form onSubmit={e => handleEditContact(e)}>
				<div style={{background: '#3f51b5', padding: 16}}>
          <Grid container>
            <Close
              style={{color: 'white', marginLeft: 'auto', cursor: 'pointer'}}
							onClick={()=>setViewDialog(false)}
            />
          </Grid>
        </div>
			<Grid container direction="column" style={{padding: 16}}>
				<Grid container item md={12}>
					<Grid item md={6} xs={12} className={classes.textCont}>
						<TextField
							required
							label="First Name"
							margin="normal"
			        variant="outlined"
			        fullWidth
			        value={editCont.first_name}
			        onChange={e=>setEditCont({...editCont, first_name: e.target.value})}
						/>
					</Grid>
					<Grid item md={6} xs={12} className={classes.textCont}>
						<TextField
							required
							label="Last Name"
							margin="normal"
			        variant="outlined"
			        value={editCont.last_name}
			        fullWidth
			        onChange={e=>setEditCont({...editCont, last_name: e.target.value})}
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
			        value={editCont.home_phone}
			        onChange={e=>setEditCont({...editCont, home_phone: e.target.value})}
						/>
					</Grid>
					<Grid item md={4} xs={12} className={classes.textCont}>
						<TextField
							label="Mobile Phone"
							margin="normal"
			        variant="outlined"
			        fullWidth
			        value={editCont.mobile_phone}
			        onChange={e=>setEditCont({...editCont, mobile_phone: e.target.value})}
						/>
					</Grid>
					<Grid item md={4} xs={12} className={classes.textCont}>
						<TextField
							label="Work Phone"
							margin="normal"
			        variant="outlined"
			        fullWidth
			        value={editCont.work_phone}
			        onChange={e=>setEditCont({...editCont, work_phone: e.target.value})}
						/>
					</Grid>
				</Grid>

				<Grid container item md={12} className={classes.textCont}>
					<TextField
						label="Email"
						margin="normal"
		        variant="outlined"
		        fullWidth
		        value={editCont.email}
		        onChange={e=>setEditCont({...editCont, email: e.target.value})}
					/>
				</Grid>

				<Grid container item md={12}>
					<Grid item md={6} xs={12} className={classes.textCont}>
						<TextField
							label="City"
							margin="normal"
			        variant="outlined"
			        fullWidth
			        value={editCont.city}
			        onChange={e=>setEditCont({...editCont, city: e.target.value})}
						/>
					</Grid>
					<Grid item md={6} xs={12} className={classes.textCont}>
						<TextField
							label="State or Province"
							margin="normal"
			        variant="outlined"
			        fullWidth
			        value={editCont.state_or_province}
			        onChange={e=>setEditCont({...editCont, state_or_province: e.target.value})}
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
			        value={editCont.postal_code}
			        onChange={e=>setEditCont({...editCont, postal_code: e.target.value})}
						/>
					</Grid>
					<Grid item md={6} xs={12} className={classes.textCont}>
						<TextField
							label="Country"
							margin="normal"
			        variant="outlined"
			        fullWidth
			        value={editCont.country}
			        onChange={e=>setEditCont({...editCont, country: e.target.value})}
						/>
					</Grid>
				</Grid>
				<Button
					style={{margin: 8, color: '#3f51b5', border: '1px solid #3f51b5'}}
					type="submit"
					>
						save contact
					</Button>
			</Grid>
			</form>
		</Dialog>
	)
}
