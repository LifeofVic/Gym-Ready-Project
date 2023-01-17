import React from 'react';
import { Link } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Grid, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../AboutPage/AboutPage.css';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
	return (
		<>
			<Grid className='about-container' align='center'>
				<h1>About</h1>
			</Grid>
			<p className='about-paragraph'>
				Gym Ready helps users have access to hundred's of exercises readily
				available on their mobile device. Categorize exercises by muscle groups
				and save them for future use. Gym Ready provides helpful animations to
				users so they can perform each exercise correctly. Bringing the
				confidence on your next workout session.
			</p>
			<div className='tech-list'>
				<h3>Technologies used:</h3>
				<ul className='unordered-list'>
					<li>Javascript</li>
					<li>React.js</li>
					<li>React-Saga</li>
					<li>React-Redux</li>
					<li>PostgreSQL</li>
					<li>Node.js</li>
					<li>Express.js</li>
					<li>Material UI</li>
					<li>React-Toastify</li>
				</ul>
			</div>
			<Grid align='center'>
				<IconButton href='https://github.com/LifeofVic'>
					<GitHubIcon sx={{ fontSize: 100 }} />
				</IconButton>

				<IconButton href='https://www.linkedin.com/in/victorllapa/'>
					<LinkedInIcon sx={{ fontSize: 100 }} />
				</IconButton>
			</Grid>
			{/* <img src='documentation/images/githubQRcode.jpg' alt='githubQRcode' />
			<img src='..q/images/githubQRcode.jpg' alt='linkedinQRcode' /> */}
		</>
	);
}
export default AboutPage;
