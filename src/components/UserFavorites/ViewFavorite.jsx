import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useHistory } from 'react-router-dom';
import { Grid, MenuItem, Typography } from '@mui/material';

import '../UserFavorites/ViewFavorite.css';

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

	const DisplayAnimation = exercise => {
		console.log('View Button on Exercise Clicked: ', exercise.exercise_id);

		dispatch({
			type: 'SET_ANIMATION',
			payload: exercise,
		});
		history.push(`/animation/${exercise.exercise_id}`);
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
			exerciseObject
		);

		if (exerciseObject[0].like === false) {
			//! This switches to LIKE ---------
			console.log(e.target.value); //holds the value for the exercise id found in the table "exercises".
			dispatch({
				type: 'CHANGE_TRUE_FALSE',
				id: e.target.value,
				payload: { boolean: true, user: user },
			});
		} else if (exerciseObject[0].like === true) {
			dispatch({
				type: 'CHANGE_TRUE_FALSE',
				id: e.target.value,
				payload: { boolean: false, user: user },
			});
		}
	};

	return (
		<>
			<Grid id='table-header' align='center'>
				<h1> Favorites List ✍️</h1>
			</Grid>
			<div className='container'>
				{data.map((exercise, index) => {
					if (exercise.like == true) {
						return (
							<Grid className='Exercise-content-liked' key={index}>
								<Grid key={exercise.id} id='row-content'>
									<MenuItem id='name' sx={{ height: 5 }}>
										<p>Exercise: </p>
										{exercise.exercise_name}
									</MenuItem>
									<MenuItem id='muscle-group' sx={{ height: 5 }}>
										<p>Muscle Group: </p>
										{exercise.muscle_group}
									</MenuItem>
									<MenuItem id='muscle-target' sx={{ height: 5 }}>
										<p>Targeted Muscle: </p>
										{exercise.muscle_target}
									</MenuItem>
								</Grid>
								<Grid alignItems='center'>
									<Stack className='button-options' direction='row' gap={4}>
										<Button
											className='edit-btn'
											id='popUp'
											value={exercise.id}
											variant='contained'
											onClick={UpdateLike}>
											❤️
										</Button>
										<Button
											className='view-btn'
											value={exercise.exercise_id}
											onClick={() => DisplayAnimation(exercise)}
											variant='contained'>
											VIEW
										</Button>
										<Button
											className='delete-btn'
											value={exercise.id}
											variant='contained'
											onClick={DeleteExercise}
											style={{
												backgroundColor: '#De1c06',
											}}>
											DELETE
										</Button>
									</Stack>
								</Grid>
							</Grid>
						);
					} else {
						return (
							<Grid className='Exercise-content'>
								<Grid key={exercise.id} id='row-content'>
									<MenuItem id='name' sx={{ height: 5 }}>
										<p>Exercise: </p>
										{exercise.exercise_name}
									</MenuItem>
									<MenuItem id='muscle-group' sx={{ height: 5 }}>
										<p>Muscle Group: </p>
										{exercise.muscle_group}
									</MenuItem>
									<MenuItem id='muscle-target' sx={{ height: 5 }}>
										<p>Targeted Muscle: </p>
										{exercise.muscle_target}
									</MenuItem>
								</Grid>
								<Grid alignItems='center'>
									<Stack className='button-options' direction='row' gap={4}>
										<Button
											className='edit-btn'
											id='popUp'
											value={exercise.id}
											variant='contained'
											onClick={UpdateLike}>
											LIKE
										</Button>
										<Button
											className='view-btn'
											value={exercise.exercise_id}
											onClick={() => DisplayAnimation(exercise)}
											variant='contained'>
											VIEW
										</Button>
										<Button
											className='delete-btn'
											value={exercise.id}
											variant='contained'
											onClick={DeleteExercise}
											style={{
												backgroundColor: '#De1c06',
											}}>
											DELETE
										</Button>
									</Stack>
								</Grid>
							</Grid>
						);
					}
				})}
			</div>
		</>
	);
}
