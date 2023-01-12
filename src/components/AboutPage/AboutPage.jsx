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
		<div className='about-container'>
			<h1>About</h1>
			<p>
				Gym Ready helps users have hundred's of exercises readily available.
				Categorize exercises by muscle group and the muscle being targeted. Gym
				Ready also provides the animation for every exercise to have a visual
				representation of how to properly execute each movement.
			</p>

			<h5>Technologies used:</h5>
			<ul>
				<li>Javascript</li>
				<li>React.js</li>
				<li>React-Saga</li>
				<li>React-Redux</li>
				<li>PostgreSQL</li>
				<li>Node.js</li>
				<li>Express.js</li>
				<li>Material UI</li>
			</ul>
			<Grid align='center'>
				<IconButton href='https://github.com/LifeofVic'>
					<GitHubIcon sx={{ fontSize: 100 }} />
				</IconButton>

				<IconButton href='https://www.linkedin.com/in/victorllapa/'>
					<LinkedInIcon sx={{ fontSize: 100 }} />
				</IconButton>
			</Grid>
		</div>
	);
}

export default AboutPage;
