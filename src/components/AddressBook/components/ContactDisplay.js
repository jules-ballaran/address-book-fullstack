import React from 'react'
import {
	Paper,
	Grid,
	Tooltip,
} from '@material-ui/core'
import { Contacts, Delete, GroupAdd, ContactPhone } from '@material-ui/icons/'

export default function ContactDisplay(props) {
	const { contact, classes, handleView, setContact, setAnchorEl, handleDelete, search } = props
	return (
		contact.first_name.match(new RegExp(search, "gi")) || contact.last_name.match(new RegExp(search, "gi")) ?
			<Paper key={contact.id} className={classes.item} 
				onClick={()=>handleView(contact)}
			>
				<Grid 
					container 
					direction="row"
					alignItems="center"
					style={{height: '100%'}}
				>
					<div>
						<Grid container alignItems="center"><Contacts style={{margin: '0 8px 0 20px'}}/>{contact.first_name} {contact.last_name}</Grid>
						<Grid container alignItems="center"><ContactPhone style={{margin: '0 8px 0 20px'}}/>{contact.home_phone}</Grid>
					</div>
					<Tooltip title="Add to group">
						<GroupAdd style={{margin: '0 8px 0 auto'}} 
							onClick={(e) => {
								e.stopPropagation()
								setContact(contact)
								setAnchorEl(e.currentTarget)
							}}
						/>
					</Tooltip>	
					<Tooltip title="Delete">
						<Delete style={{margin: '0 8px 0 0'}} onClick={(e)=>handleDelete(e, contact.id)}/>
					</Tooltip>	
				</Grid>
			</Paper>
		: null
	)
}