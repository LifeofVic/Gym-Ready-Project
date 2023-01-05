import '../Dashboard-TodaysWorkout/DailyWorkout.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
export default function TodaysWorkout() {
	const dailyWorkout = useSelector(store => store.exercise);

	const history = useHistory();
	const dispatch = useDispatch();

	const WorkoutView = () => {
		console.log('Clicked on WorkoutView');
		history.push('/today');
	};

	return (
		<div className='dailyWorkoutContainer'>
			<h3>Daily Workout Component </h3>
			<p>
				This component will display the workout that is assigned for the day.
			</p>
			<img src={dailyWorkout.gif_url} />
			<button onClick={WorkoutView}> Go To Daily Workout View </button>
		</div>
	);
}
