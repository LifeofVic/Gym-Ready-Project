import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//TODO This will display the View page for the users workout for the day.
//? Will have to insert workouts for each user inorder to display them onto the view page.

export default function TodaysWorkout() {
	const dispatch = useDispatch();

	const fetchWorkout = () => {
		dispatch({ type: 'FETCH_ROUTINE' });
	};

	return (
		<>
			<div className='container'>
				<p>Todays Workout View</p>
				<p>Will List all the exercise associated with todays day.</p>
			</div>

			<div>
				<button onClick={fetchWorkout}> Fetch User workout</button>
			</div>
		</>
	);
}
