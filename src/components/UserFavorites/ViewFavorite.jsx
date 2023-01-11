import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';

import '../UserFavorites/ViewFavorite.css';
import { useHistory } from 'react-router-dom';

//TODO This will display the View page for the users workout for the day.
//? Will have to insert workouts for each user in order to display them onto the view page.

export default function ViewFavorite() {
	const user = useSelector(store => store.user);
	const data = useSelector(store => store.favorite.FavoriteList);

	console.log('user info: ', user); //?Displays the users basic information.

	console.log('Favorite List: ', data); //?Hold an ARRAY of OBJECT received from the database using the sql query and saving them into the reducer aka store.favorite...

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		dispatch({ type: 'FETCH_FAVORITE', payload: { user: user.id } });
	}, []);

	const DisplayAnimation = e => {
		console.log('View Button on Exercise Clicked: ', e.target.value);

		dispatch({
			type: 'DISPLAY_ANIMATION_VIEW',
			payload: e.target.value,
		});
		history.push(`/animation/${e.target.value}`);
	};

	const DeleteExercise = e => {
		const deleteId = Number(e.target.value);
		console.log('Exercise Selected for Deletion: ', deleteId);
		dispatch({
			type: 'DELETE_FAVORITE',
			payload: { exerciseID: deleteId, userID: user.id },
		});
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
		}
		if (exerciseObject[0].like === true) {
			dispatch({
				type: 'CHANGE_TRUE_FALSE',
				id: e.target.value,
				payload: { boolean: false, user: user },
			});
		}
	};

	return (
		<>
			<div className='container'>
				<p>Todays Workout View</p>
				<p>Will List all the exercise associated with todays day.</p>

				<tr id='table-header'>
					<th>Exercise Name</th>
					<th>Targeted Muscle</th>
				</tr>

				{data.map((exercise, index) => {
					if (exercise.like == true) {
						return (
							<table className='Exercise-content-liked'>
								<tr key={exercise.id} id='row-content'>
									<td id='name'>{exercise.exercise_name} </td>
									<td id='target-muscle'> {exercise.muscle_target} </td>
								</tr>
								<tr className='button-options'>
									<td>
										<Button
											className='edit-btn'
											id='popUp'
											value={exercise.id}
											variant='contained'
											onClick={UpdateLike}>
											❤️
										</Button>
									</td>
									<td>
										<Button
											className='view-btn'
											value={exercise.id}
											onClick={DisplayAnimation}
											variant='contained'>
											VIEW
										</Button>
									</td>
									<td>
										<Button
											className='delete-btn'
											value={exercise.id}
											variant='contained'
											onClick={DeleteExercise}>
											DELETE
										</Button>
									</td>
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
									<td>
										<Button
											className='edit-btn'
											id='popUp'
											value={exercise.id}
											variant='contained'
											onClick={UpdateLike}>
											LIKE
										</Button>
									</td>
									<td>
										<Button
											className='view-btn'
											value={exercise.id}
											onClick={DisplayAnimation}
											variant='contained'
											type='button'>
											VIEW
										</Button>
									</td>
									<td>
										<Button
											className='delete-btn'
											value={exercise.id}
											variant='contained'
											onClick={DeleteExercise}>
											DELETE
										</Button>
									</td>
								</tr>
							</table>
						);
					}
				})}
			</div>
		</>
	);
}
