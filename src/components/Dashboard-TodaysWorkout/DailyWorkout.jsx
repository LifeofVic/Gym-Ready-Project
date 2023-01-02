import '../Dashboard-TodaysWorkout/DailyWorkout.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
export default function TodaysWorkout() {
	const dailyWorkout = useSelector(store => store.exercise);
	const [newExercise, setExercise] = useState([]);

	const dispatch = useDispatch();

	const getWorkout = () => {
		console.log('Clicked on Random Exercise Button');
		dispatch({ type: 'FETCH_RANDOM_EXERCISE' });
	};

	return (
		<div className='dailyWorkoutContainer'>
			<h3>Daily Workout Component </h3>
			<p>
				This component will display the exercise desired according to the id
				number...
			</p>
			<button onClick={getWorkout}> Get Random Workout </button>
			{JSON.stringify(dailyWorkout)}
		</div>
	);
}
