import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavSearch,
NavBtnLinkFile
} from './NavbarElements';
import SearchBar from '../FunctionalBtns/SearchBar';
import UploadData from '../FunctionalBtns/UploadData';

const Navbar = () => {
	const [open, setOpen] = React.useState(false);
	
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
		<Nav>
			<Bars />
			
			<NavMenu>
			<NavLink to='/'>
				<p style={{ fontSize: 26,
							color: "white",
							textAlign: "left",
							fontFamily: "Helvetica",
							fontWeight: "bold"
					}}>
						CPT
				</p>
			</NavLink>
			
			<NavSearch>
				<SearchBar />
			</NavSearch>
					
			{/* <NavLink to='/about'>
				About
			</NavLink>
			<NavLink to='/events'>
				Events
			</NavLink>
			<NavLink to='/annual'>
				Sources
			</NavLink>
			<NavLink to='/team'>
				Teams
			</NavLink>
			<NavLink to='/blogs'>
				Publications
			</NavLink>
			<NavLink to='/sign-up' >
				Sign Up
			</NavLink> */}
			
			<NavBtnLinkFile onClick={handleClickOpen} >
				Upload Data
			</NavBtnLinkFile>
			
			<UploadData open={open} handleClose={handleClose} />
			
			</NavMenu>

		</Nav>
		</>
	);
};

export default Navbar;
