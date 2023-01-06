import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//TODO This will display the View page for the users workout for the day.
//? Will have to insert workouts for each user in order to display them onto the view page.

export default function ViewFavorite() {
	const user = useSelector(store => store.user);
	console.log('user info: ', user);

	var FavoriteCollection = [];

	const dispatch = useDispatch();

	const fetchFavorites = () => {
		console.log('FetchWorkout event listener is working. ');
		dispatch({ type: 'FETCH_FAVORITE', payload: { user: user.id } });
	};

	return (
		<>
			<div className='container'>
				<p>Todays Workout View</p>
				<p>Will List all the exercise associated with todays day.</p>
			</div>

			<div>
				<button onClick={fetchFavorites}> Fetch User workout</button>
			</div>
			<div className='exercise-content'></div>
		</>
	);
}
