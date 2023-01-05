import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//TODO This will display the View page for the users workout for the day.
//? Will have to insert workouts for each user in order to display them onto the view page.

export default function TodaysWorkout() {
	const dispatch = useDispatch();

	const fetchWorkout = () => {
		console.log('FetchWorkout event listener is working. ');
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
			<div>
				This will display the users exercise for a certain day of the week.
			</div>
		</>
	);
}
