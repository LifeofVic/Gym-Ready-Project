import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//TODO This will display the View page for the users workout for the day.
//? Will have to insert workouts for each user in order to display them onto the view page.

export default function ViewFavorite() {
	const user = useSelector(store => store.user);
	const data = useSelector(store => store.favorite.FavoriteList);

	console.log('user info: ', user); //?Displays the users basic information.

	console.log('Favorite List: ', data); //?Hold an ARRAY of OBJECT received from the database using the sql query and saving them into the reducer aka store.favorite...

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: 'FETCH_FAVORITE', payload: { user: user.id } });
	}, []);

	const fetchFavorites = () => {
		console.log('FetchWorkout event listener is working. ');
		dispatch({ type: 'FETCH_FAVORITE', payload: { user: user.id } });
	};

	return (
		<>
			<div className='container'>
				<p>Todays Workout View</p>
				<p>Will List all the exercise associated with todays day.</p>
				<th id='table-header'>
					<tr>
						<td>Exercise Name</td>
						<td>Targeted Muscle</td>
					</tr>
				</th>

				{data.map((exercise, index) => {
					return (
						<table className='Exercise-content'>
							<tr key={exercise.id} id='row-content'>
								<td> {exercise.exercise_name} </td>
								<td> {exercise.muscle_target} </td>
								<button className='view-btn'>VIEW</button>
								<button className='edit-btn'>EDIT</button>
								<button className='delete-btn'>DELETE</button>
							</tr>
						</table>
					);
				})}
			</div>
		</>
	);
}
