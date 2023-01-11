import '../Dashboard/Dashboard.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

function Dashboard() {
	// this allows us to use <App /> in index.js

	// this component doesn't do much to start, just renders some user reducer info to the DOM
	const user = useSelector(store => store.user);

	const AllExercises = useSelector(store => store.exercise.AllExercises);

	const [RandomNumber, setRandomNumber] = useState(0);

	const dispatch = useDispatch();

	const Random = () => {
		const max = 1327;
		const min = 1;
		const random = Math.floor(Math.random() * (max - min) + min);
		console.log('Random Number is:  ', Number(random));
		setRandomNumber(random);
	};

	const saveExercise = () => {
		console.log('Clicked on Save');
	};

	useEffect(() => {
		dispatch({
			type: 'GENERATE_RANDOM_EXERCISE',
		});
	}, []);

	const history = useHistory();

	const GoToSearch = () => {
		history.push('/search-exercise');
	};

	if (AllExercises.length == 0) {
		return (
			<div className='body-container'>
				<h2>Welcome, {user.username}!</h2>
				{/* <p>Your ID is: {user.id}</p> */}
				<div>
					<button onClick={Random}>Suggestion ?</button>
				</div>
			</div>
		);
	} else {
		return (
			<div className='body-container'>
				<h2>Welcome, {user.username}!</h2>
				<p>Your ID is: {user.id}</p>
				<div>
					<Button onClick={Random} variant='contained'>
						Suggestion ?
					</Button>
					<Button onClick={saveExercise} variant='contained'>
						Save
					</Button>
				</div>

				{/* < className='suggestion-container' onClick={GoToSearch}> */}
				<div className='suggestion-container'>
					<div className='home-exercise-group'>
						<h4> Targeted Muscle: </h4>
						<p>{AllExercises[RandomNumber].muscle_group}</p>
					</div>

					<div className='home-exercise-gif'>
						<h4>Muscle Group: </h4>
						<p>{AllExercises[RandomNumber].muscle_target}</p>
					</div>

					<div className='home-exercise-name'>
						<h4> Exercise Name: </h4>
						<p>{AllExercises[RandomNumber].exercise_name}</p>
					</div>

					<div>
						<img src={AllExercises[RandomNumber].gif_url} />
					</div>
				</div>
			</div>
		);
	}
}
export default Dashboard;
