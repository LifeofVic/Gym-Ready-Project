import React, { useState } from 'react';
import '../CreateWorkout-View/CreateWorkout.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

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
	// Stores the  string value from the toggled day selected by the user.
	const [SelectDay, setToggledDay] = useState('');

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

	//This event listener will run when the user selects the desired day in the toggle options of the view page
	//and store that value into the corresponding local state.
	const DaySelected = e => {
		setToggledDay(e.target.value);
		console.log('Day Selected is: ', e.target.value);
		e.preventDefault();
	};

	//Once all the values have been saved to the proper variable,
	//This will send:
	// day: 'Monday'    - Day selected.
	// exerciseId: 22   - value corresponding to the exercise's id that will be use to referenced
	//											to the TABLE 'exercise'.
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
		setExerciseGif('');
		setExerciseId('');
		setToggledDay('');
	};

	return (
		<>
			{/* <header className='Create-Workout-Header'>Create Your Workout</header> */}
			<div className='filter-section'>
				<select placeholder='Muscle-Group' onChange={ExerciseByGroup}>
					<option>Muscle Group...</option>
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
					onChange={SetValues}>
					<option>exercise selection... </option>
					{GroupedExercise.map((exercise, index) => {
						return (
							<>
								<option className='Drop-List' key={index} value={exercise.id}>
									{exercise.exercise_name} ID: {exercise.id}
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
			<button className='submit-btn' onClick={AddExercise}>
				Add Favorite
			</button>
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
