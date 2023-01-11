import '../Dashboard/Dashboard.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Dashboard() {
	// this allows us to use <App /> in index.js

	// this component doesn't do much to start, just renders some user reducer info to the DOM
	const user = useSelector(store => store.user);

	const AllExercises = useSelector(store => store.exercise.AllExercises);

	const [RandomExercise, setRandomExercise] = useState([]);

	const dispatch = useDispatch();

	const max = 1327;
	const min = 1;
	const random = Math.floor(Math.random() * (max - min) + min);

	const Random = () => {
		console.log('Random Number is:  ', Number(random));
		dispatch({
			type: 'GENERATE_RANDOM_EXERCISE',
			payload: { exerciseID: random },
		});
		setRandomExercise(AllExercises[random]);
	};
	const history = useHistory();

	const GoToSearch = () => {
		history.push('/search-exercise');
	};

	return (
		<div className='body-container'>
			<h2>Welcome, {user.username}!</h2>
			<p>Your ID is: {user.id}</p>

			<button onClick={Random}>Suggestion ?</button>
			<table className='suggestion-container' onClick={GoToSearch}>
				<tr>
					<th> Exercise Name: </th>
					<th> Muscle Group: </th>
					<th> Targeted Muscle: </th>
				</tr>
				<tr>
					<td>{RandomExercise.exercise_name}</td>
					<td>{RandomExercise.muscle_group}</td>
					<td>{RandomExercise.muscle_target}</td>
				</tr>
			</table>

			<div className='image-container'>
				<img
					src={RandomExercise.gif_url}
					height='200'
					width='200'
					id='home-image'
				/>
			</div>
		</div>
	);
}

export default Dashboard;
