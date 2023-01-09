import React, { useState } from 'react';
import '../CreateWorkout-View/CreateWorkout.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
export default function CreateWorkout() {
	const dispatch = useDispatch();
	//This uses global state to bring in the array of objects with the same muscle_group which each object will contain:
	// id / muscle_group / gif_url / exercise_name / muscle_target
	const GroupedExercise = useSelector(store => store.exercise);

	const user = useSelector(store => store.user);

	//Will store the a string used for the animation.
	const [ExerciseGif, setExerciseGif] = useState();
	// Stores the number value the selected Exercise from the drop down list of exercise.
	const [ExerciseId, setExerciseId] = useState(0);

	const history = useHistory();

	// This will send the muscle_group value of data type (string) to the exercise.Saga and set result.row to the [store.exercise] where all the exercises with that muscle_group will store in.   GroupedExercise.
	const ExerciseByGroup = e => {
		e.preventDefault();
		console.log('Value is: ', e.target.value);
		dispatch({ type: 'EXERCISE_BY_GROUP', payload: e.target.value });
	};
	//This will run where the event handler will set those values into the corresponding local state to be used in the [AddExercise] once the 'Add Exercise' button is clicked on.
	//utilizing the filter method to look through the global store of the grouped exercises and find the one
	//with the id value as the one event.target.value
	const SetValues = event => {
		setExerciseId(event.target.value);
		console.log('Selected Exercise ID is: ', event.target.value);

		let findGif = GroupedExercise.filter(
			object => object.id == event.target.value
		);
		setExerciseGif(findGif[0].gif_url);
	};

	const AddExercise = () => {
		const exerciseObject = GroupedExercise.filter(
			object => object.id == ExerciseId
		);
		console.log(
			'exercise object is: ',
			exerciseObject[0].id,
			'user data:',
			user.id
		);
		dispatch({
			type: 'SET_FAVORITE',
			payload: { exercise: exerciseObject[0].id, user: user.id },
		});
		document.getElementById('muscle-group').selectedIndex = 0;
		document.getElementById('exercise-list-by-group').selectedIndex = 0;
		setExerciseGif('');
		setExerciseId('');
	};
	//TODO Create a new view that will allow the user to add a new exercise.
	const HandleClick = () => {
		console.log('Add New Exercise had been Clicked!');
		history.push('/InsertNewExercise');
	};

	return (
		<>
			{/* <header className='Create-Workout-Header'>Create Your Workout</header> */}
			<div className='filter-section'>
				<select
					placeholder='Muscle-Group'
					id='muscle-group'
					onChange={ExerciseByGroup}>
					<option>Select Muscle Group</option>
					<option value='chest'>Chest </option>
					<option value='back'>Back </option>
					<option value='cardio'>Cardio </option>
					<option value='lower arms'>Lower Arms </option>
					<option value='waist'>Waist </option>
					<option value='shoulders'>Shoulders </option>
					<option value='lower legs'>Lower Legs </option>
					<option value='neck'>Neck </option>
					<option value='upper arms'>Upper Arms </option>
					<option value='upper legs'>Upper Legs </option>
				</select>

				<select
					placeholder='Exercise'
					className='exercise-list'
					id='exercise-list-by-group'
					onChange={SetValues}>
					<option>Select Exercise </option>
					{GroupedExercise.map((exercise, index) => {
						return (
							<>
								<option className='Drop-List' key={index} value={exercise.id}>
									{exercise.exercise_name}
								</option>
							</>
						);
					})}
				</select>

				{/* <input type='number' placeholder='# of sets'></input> */}
			</div>
			<div className='exercise-detail'>
				<img src={ExerciseGif} />
			</div>
			<Button className='submit-btn' onClick={AddExercise} variant='contained'>
				Add To Favorites
			</Button>
			<Button
				className='add-exercise-btn'
				onClick={HandleClick}
				variant='contained'>
				Add New Exercise
			</Button>
		</>
	);
}

//! This will allow the exercises names to be displayed onto the DOM in the dropdown filter.
/* {GroupedExercise.map(exercise => {
					return (
						<>
							<p> {exercise.exercise_name} </p>
						</>
					);
				})} */
