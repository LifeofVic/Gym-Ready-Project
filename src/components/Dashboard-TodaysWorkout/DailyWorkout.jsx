import '../Dashboard-TodaysWorkout/DailyWorkout.css';
import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
export default function TodaysWorkout() {
	const dailyWorkout = useSelector(store => store.exercise);

	const dispatch = useDispatch();
	const getWorkout = () => {
		dispatch({ Type: 'RANDOM_EXERCISE' });
	};

	return (
		<div className='dailyWorkoutContainer'>
			<h3>Daily Workout Component </h3>
			<p>
				Lorem Ipsum is simply dummy text of the printing and typesetting
				industry.
			</p>
			<button onClick={getWorkout}> Get Random Workout </button>
			{JSON.stringify(dailyWorkout)}
		</div>
	);
}
