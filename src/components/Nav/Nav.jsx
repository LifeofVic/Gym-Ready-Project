import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

function Nav() {
	const user = useSelector(store => store.user);
	const [value, setValue] = React.useState(0);

	return (
		<Box className='nav'>
			{/* <Link to='/home'>
				<h2 className='nav-title'>Gym Ready</h2>
			</Link> */}
			<BottomNavigation
				showLabels
				value={value}
				onChange={newValue => {
					setValue(newValue);
				}}>
				{/* If no user is logged in, show these links */}
				{!user.id && (
					// If there's no user, show login/registration links
					<BottomNavigationAction
						className='navLink'
						value='/login'
						label='Login / Register'>
						Login / Register
					</BottomNavigationAction>
				)}

				{/* If a user is logged in, show these links */}
				{user.id && (
					<>
						<BottomNavigationAction
							className='navLink'
							value='/user'
							label='user'
							component={Link}
							to='/user'></BottomNavigationAction>

						<BottomNavigationAction
							className='navLink'
							value='/favorite'
							label='Favorite'
							component={Link}
							to='/favorite'></BottomNavigationAction>

						<BottomNavigationAction
							className='navLink'
							value='/search-exercise'
							label='Search Exercise'
							component={Link}
							to='/search-exercise'></BottomNavigationAction>

						<BottomNavigationAction>
							<LogOutButton className='navLink' />
						</BottomNavigationAction>
					</>
				)}

				<BottomNavigationAction
					className='navLink'
					value='/about'
					label='About'>
					About
				</BottomNavigationAction>
			</BottomNavigation>
		</Box>
	);
}

export default Nav;
