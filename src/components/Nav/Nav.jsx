import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
function Nav() {
	const user = useSelector(store => store.user);

	return (
		<div className='nav'>
			{/* <Link to='/home'>
				<h2 className='nav-title'>Gym Ready</h2>
			</Link> */}
			<div>
				{/* If no user is logged in, show these links */}
				{!user.id && (
					// If there's no user, show login/registration links
					<Link className='navLink' to='/login'>
						Login / Register
					</Link>
				)}

				{/* If a user is logged in, show these links */}
				{user.id && (
					<>
						<Link className='navLink' to='/user'>
							<HomeIcon fontSize='large' />
						</Link>

						<Link className='navLink' to='/favorite'>
							<BookmarkAddIcon fontSize='large' />
						</Link>

						<Link className='navLink' to='/search-exercise'>
							<SearchIcon fontSize='large' />
						</Link>

						<LogOutButton className='navLink' to='login' />
					</>
				)}

				<Link className='navLink' to='/about'>
					<InfoIcon fontSize='large' />
				</Link>
			</div>
		</div>
	);
}

export default Nav;
