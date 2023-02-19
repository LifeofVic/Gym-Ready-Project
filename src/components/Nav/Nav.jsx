import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";

import Paper from "@mui/material/Paper";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

function Nav() {
	const user = useSelector(store => store.user);

	return (
		<Paper
			sx={{
				position: "fixed",
				bottom: 0,
				left: 0,
				right: 0,
				zIndex: 1,
				width: "100vw",
				backgroundColor: "#348d2d",
			}}>
			{user.id && (
				<BottomNavigation showLabels sx={{ backgroundColor: "#348d2d" }}>
					<BottomNavigationAction
						label='Home'
						value='home'
						icon={<HomeIcon fontSize='large' sx={{ color: "#ffffff" }} />}
						component={Link}
						to='/user'
					/>
					<BottomNavigationAction
						label='Favorites'
						value='home'
						icon={
							<BookmarkAddIcon fontSize='large' sx={{ color: "#ffffff" }} />
						}
						component={Link}
						to='/favorite'
					/>
					<BottomNavigationAction
						label='Search'
						value='home'
						icon={<SearchIcon fontSize='large' sx={{ color: "#ffffff" }} />}
						component={Link}
						to='/search-exercise'
					/>

					<BottomNavigationAction
						label='About'
						value='about'
						icon={<InfoIcon fontSize='large' sx={{ color: "#ffffff" }} />}
						component={Link}
						to='/about'
					/>

					<BottomNavigationAction
						label='Log Out'
						value='logout'
						icon={<LogoutIcon fontSize='large' sx={{ color: "#ffffff" }} />}
						component={Link}
						to='login'
					/>
				</BottomNavigation>
			)}
		</Paper>
	);
}

export default Nav;
