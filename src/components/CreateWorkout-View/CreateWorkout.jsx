import React, { useState } from 'react';
import '../CreateWorkout-View/CreateWorkout.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function CreateWorkout() {
	const dispatch = useDispatch();
	const GroupedExercise = useSelector(store => store.exercise);

	const [ExerciseGif, setExerciseGif] = useState(''); //Will
	const [ExerciseId, setExerciseId] = useState('');
	const [SelectDay, setToggledDay] = useState('');

	const ExerciseByGroup = e => {
		e.preventDefault();
		console.log('Value is: ', e.target.value);
		dispatch({ type: 'EXERCISE_BY_GROUP', payload: e.target.value });
	};

	const DisplayExercise = (event, id) => {
		setExerciseId(id);
		setExerciseGif(event.target.value);

		console.log('Selected Gif is: ', event.target.value);
		console.log('Selected Exercise ID is: ', event.target.id);
	};

	const DaySelected = e => {
		setToggledDay(e.target.value);
		console.log('Day Selected is: ', DaySelected);
		e.preventDefault();
	};

	const AddExercise = () => {
		dispatch({
			type: 'SET_ROUTINE',
			payload: { day: SelectDay, exerciseId: ExerciseId },
		});
	};

	return (
		<>
			{/* <header className='Create-Workout-Header'>Create Your Workout</header> */}
			<div className='filter-section'>
				<select placeholder='Muscle-Group' onChange={ExerciseByGroup}>
					<option>Muscle Group... </option>
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
					onChange={DisplayExercise}>
					<option>exercise selection... </option>
					{GroupedExercise.map((exercise, index) => {
						return (
							<>
								<option
									key={index}
									value={exercise.gif_url}
									id={exercise.id}
									onChange={event => DisplayExercise(event, exercise.id)}>
									{exercise.exercise_name} ID: {exercise.id}
								</option>
							</>
						);
					})}
				</select>

				<input type='number' placeholder='# of sets'></input>
			</div>
			{JSON.stringify(ExerciseId)}
			<div className='exercise-detail'>
				<img src={ExerciseGif} />
			</div>
			<div className='day-section'>
				<label className='switch'>
					<input type='checkbox' value='Sunday' onChange={DaySelected} />
					<span className='slider round'>Sunday</span>
				</label>

				<label className='switch'>
					<input type='checkbox' value='Monday' onChange={DaySelected} />
					<span className='slider round'>Monday</span>
				</label>

				<label className='switch'>
					<input type='checkbox' value='Tuesday' onChange={DaySelected} />
					<span className='slider round'>Tuesday</span>
				</label>

				<label className='switch'>
					<input type='checkbox' value='Wednesday' onChange={DaySelected} />
					<span className='slider round'>Wednesday</span>
				</label>

				<label className='switch'>
					<input type='checkbox' value='Thursday' onChange={DaySelected} />
					<span className='slider round'>Thursday</span>
				</label>

				<label className='switch'>
					<input type='checkbox' value='Friday' onChange={DaySelected} />
					<span className='slider round'>Friday</span>
				</label>

				<label className='switch'>
					<input type='checkbox' value='Saturday' onChange={DaySelected} />
					<span className='slider round'>Saturday</span>
				</label>
			</div>
			<button className='submit-btn' onClick={AddExercise}>
				Add Exercise
			</button>
		</>
	);
}

//! This will allow the exercises names to be displayed onto the DOM in the dropdown filter.
{
	/* {GroupedExercise.map(exercise => {
					return (
						<>
							<p> {exercise.exercise_name} </p>
						</>
					);
				})} */
}
