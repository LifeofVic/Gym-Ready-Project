import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';

import '../UserFavorites/ViewFavorite.css';

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

	// const fetchFavorites = () => {
	// 	console.log('FetchWorkout event listener is working. ');
	// 	dispatch({ type: 'FETCH_FAVORITE', payload: { user: user.id } });
	// };

	const DisplayAnimation = e => {
		var imageSource = e.target.value;
		console.log('Gif: ', imageSource);
	};

	const DeleteExercise = e => {
		const deleteId = Number(e.target.value);
		console.log('Exercise Selected for Deletion: ', deleteId);
		dispatch({
			type: 'DELETE_FAVORITE',
			payload: { exerciseID: deleteId, userID: user.id },
		});
		// dispatch({ type: 'FETCH_FAVORITE', payload: { user: user.id } });
	};

	//? This will check the value for the exercise object's like (true / false) that was clicked on. Then th
	const UpdateLike = e => {
		const exerciseObject = data.filter(object => object.id == e.target.value);
		console.log(
			'The object needed to be updated on click is:  ',
			exerciseObject[0]
		);

		if (exerciseObject[0].like === false) {
			//! This switches to LIKE ---------
			console.log('In Edit Mode', e.target.value); //holds the value for the exercise id found in the table "exercises".

			dispatch({
				type: 'CHANGE_TRUE_FALSE',
				id: e.target.value,
				payload: { boolean: true, user: user },
			});
			//dispatch({ type: 'FETCH_FAVORITE', payload: { user: user.id } }); //!move to favorite saga.
			//! -------------------------------
		}
		if (exerciseObject[0].like === true) {
			dispatch({
				type: 'CHANGE_TRUE_FALSE',
				id: e.target.value,
				payload: { boolean: false, user: user },
			});
			//dispatch({ type: 'FETCH_FAVORITE', payload: { user: user.id } });
		}
	};

	//! This was a test run to get the buttons that appear below each elements when displayed on the favorites page to hide/shoe option buttons
	// var optionsButton = document.getElementById('more-options');

	// optionsButton.onClick = function () {
	// 	var div = document.getElementById('button-options');
	// 	if (div.style.display !== 'none') {
	// 		div.style.display = 'none';
	// 	} else {
	// 		div.style.display = 'block';
	// 	}
	// };

	return (
		<>
			<div className='container'>
				<p>Todays Workout View</p>
				<p>Will List all the exercise associated with todays day.</p>
				<th id='table-header'>
					<tr>
						<th>Exercise Name</th>
						<th>Targeted Muscle</th>
					</tr>
				</th>
				{data.map((exercise, index) => {
					if (exercise.like == true) {
						return (
							<table className='Exercise-content-liked'>
								<tr key={exercise.id} id='row-content'>
									<td id='name'>{exercise.exercise_name} </td>
									<td id='target-muscle'> {exercise.muscle_target} </td>
								</tr>
								<tr className='button-options'>
									<Button
										className='view-btn'
										value={exercise.gif_url}
										onClick={DisplayAnimation}
										variant='contained'>
										VIEW
									</Button>
									<Button
										className='edit-btn'
										id='popUp'
										value={exercise.id}
										variant='contained'
										onClick={UpdateLike}>
										❤️
									</Button>
									<Button
										className='delete-btn'
										value={exercise.id}
										variant='contained'
										onClick={DeleteExercise}>
										DELETE
									</Button>
								</tr>
							</table>
						);
					} else {
						return (
							<table className='Exercise-content'>
								<tr key={exercise.id} id='row-content'>
									<td id='name'>{exercise.exercise_name} </td>
									<td id='target-muscle'> {exercise.muscle_target} </td>
								</tr>
								<tr className='button-options'>
									<Button
										className='view-btn'
										value={exercise.gif_url}
										onClick={DisplayAnimation}
										variant='contained'>
										VIEW
									</Button>
									<Button
										className='edit-btn'
										id='popUp'
										value={exercise.id}
										variant='contained'
										onClick={UpdateLike}>
										LIKE
									</Button>
									<Button
										className='delete-btn'
										value={exercise.id}
										variant='contained'
										onClick={DeleteExercise}>
										DELETE
									</Button>
								</tr>
							</table>
						);
					}
				})}
			</div>
		</>
	);
}
