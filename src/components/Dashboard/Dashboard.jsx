//import LogOutButton from '../LogOutButton/LogOutButton';
//import DailyWorkout from '../Dashboard-TodaysWorkout/DailyWorkout';
//import SuggestedExercise from '../ExerciseSuggestion/SuggestedExercise.jsx';
import '../Dashboard/Dashboard.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Dashboard() {
	// this allows us to use <App /> in index.js

	// this component doesn't do much to start, just renders some user reducer info to the DOM
	const user = useSelector(store => store.user);

	const AllExercises = useSelector(store => store.exercise.AllExercises);

	const [RandomExercise, setRandomExercise] = useState([]);

	const dispatch = useDispatch();
	const max = 1327;
	const min = 1;

	// useEffect(() => {
	// 	Random;
	// }, []);

	const Random = () => {
		const random = Math.floor(Math.random() * (max - min) + min);
		console.log('Random Number is:  ', Number(random));
		dispatch({
			type: 'GENERATE_RANDOM_EXERCISE',
			payload: { exerciseID: random },
		});
		setRandomExercise(AllExercises[random]);
	};

	return (
		<>
			<h2>Welcome, {user.username}!</h2>
			<p>Your ID is: {user.id}</p>
			<div className='Weekly-Container'>
				<h3>Exercise Suggestion:</h3>

				<h5>Exercise Name:</h5>
				<p>{RandomExercise.exercise_name}</p>

				<h5>Muscle Group:</h5>
				<p>{RandomExercise.muscle_group}</p>

				<h5>Targeted Muscle:</h5>
				<p>{RandomExercise.muscle_target}</p>

				<button onClick={Random}>RANDOM</button>
				<img src={RandomExercise.gif_url} />
			</div>
		</>
	);
}

export default Dashboard;
