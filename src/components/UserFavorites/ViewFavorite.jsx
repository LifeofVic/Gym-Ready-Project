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

	const fetchFavorites = () => {
		console.log('FetchWorkout event listener is working. ');
		dispatch({ type: 'FETCH_FAVORITE', payload: { user: user.id } });
	};

	const DisplayAnimation = e => {
		var imageSource = e.target.value;
		console.log('Gif: ', imageSource);
	};

	const DeleteExercise = e => {
		const deleteId = e.target.value;
		console.log('Exercise Selected for Deletion: ', deleteId);
		dispatch({ type: 'DELETE_EXERCISE', payload: deleteId });
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
								<Button
									className='view-btn'
									value={exercise.gif_url}
									onClick={DisplayAnimation}
									variant='contained'>
									VIEW
								</Button>
								<Button
									className='edit-btn'
									value={exercise.id}
									variant='contained'>
									EDIT
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
				})}
			</div>
		</>
	);
}
