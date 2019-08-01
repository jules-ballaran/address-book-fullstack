import React, { useState } from 'react'
import axios from 'axios'
import {
	Menu,
	MenuItem,
	Dialog,
	Button,
} from '@material-ui/core'

export default function AddToGroup(props) {
	const { anchorEl, setAnchorEl, groupList, contact, config, history } = props
	const [msg, setMsg] = useState('')
	const [open, setOpen] = useState(false)

	const handleClick = (e) => {
  	setAnchorEl(e.currentTarget);
	}

	const handleClose = () => {
	  setAnchorEl(null);
	}

	const handleAdd = (id, name) => {
		axios
			.post('http://localhost:3001/api/group/add', {
				groupid: id,
				contactid: contact.id,
				name,
			}, config)
			.then(res => {
				setMsg(res.data.msg)
				setOpen(true)
			})
			.catch(err => {
				console.error(err)
				if(err.response.status === 401){
					history.push('/auth')
				}
			})
	}
	return (
		<React.Fragment>
			<Menu
	      id="simple-menu"
	      anchorEl={anchorEl}
	      keepMounted
	      open={Boolean(anchorEl)}
	      onClose={handleClose}
	    >
	    	{groupList.map((glist, i) => (
	    		i !== 0 ? 
	    		<MenuItem
	    			style={{width: 100}} 
	    			key={i} 
	    			onClick={() => {
	    				handleClose()
	    				handleAdd(glist.id, glist.name)
	    			}}>
	    				{glist.name}
	    		</MenuItem>
	    		: null
	    	))}
	    </Menu>
	    <Dialog open={open} onClose={()=>setOpen(false)}>
	    	<div style={{padding: 20, width: 200, textAlign: 'center'}}>
	    	<h3>{msg}</h3>
	    	<Button fullWidth variant="contained" color="primary" onClick={()=>setOpen(false)}>Ok</Button>
	    	</div>
	    </Dialog>
    </React.Fragment>
	)
}