import React from 'react';
import '../CreateWorkout-View/CreateWorkout.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function CreateWorkout() {
	const GroupedExercise = useSelector(store => store.exercise);

	const dispatch = useDispatch();
	const CategoryExercise = e => {
		console.log('Value is: ', e.target.value);
		dispatch({ type: 'EXERCISE_BY_GROUP', payload: e.target.value });
	};

	return (
		<>
			<div className='filter-section' onChange={CategoryExercise}>
				<select placeholder='Muscle Group'>
					<option>Muscle Group... </option>
					<option value='chest'>Chest </option>
					<option value='back'>Back </option>
					<option value='cardio'>Cardio </option>
					<option value='lower arms'>Lower Arms </option>
					<option value='waist'>Waist </option>
					<option value='shoulder'>Shoulder </option>
					<option value='lower legs'>Lower Legs </option>
					<option value='neck'>Neck </option>
					<option value='upper arms'>Upper Arms </option>
					<option value='upper legs'>Upper Legs </option>
				</select>

				<select placeholder='Exercise' className='exercise-list'>
					<option>exercise selection... </option>
				</select>

				<input type='number' placeholder='# of sets'></input>
			</div>
			<div className='exercise-detail'>
				{GroupedExercise.map(exercise => {
					return (
						<>
							<p> {exercise.exercise_name} </p>
							<img src={exercise.gif_url} />
						</>
					);
				})}
			</div>
			<div className='day-section'>
				<label className='switch'>
					<input type='checkbox' value='Sunday' />
					<span className='slider round'>Sunday</span>
				</label>

				<label className='switch'>
					<input type='checkbox' value='Monday' />
					<span className='slider round'>Monday</span>
				</label>

				<label className='switch'>
					<input type='checkbox' value='Tuesday' />
					<span className='slider round'>Tuesday</span>
				</label>

				<label className='switch'>
					<input type='checkbox' value='Wednesday' />
					<span className='slider round'>Wednesday</span>
				</label>

				<label className='switch'>
					<input type='checkbox' value='Thursday' />
					<span className='slider round'>Thursday</span>
				</label>

				<label className='switch'>
					<input type='checkbox' value='Friday' />
					<span className='slider round'>Friday</span>
				</label>

				<label className='switch'>
					<input type='checkbox' value='Saturday' />
					<span className='slider round'>Saturday</span>
				</label>
			</div>
			<button className='submit-btn'> Add Exercise</button>
		</>
	);
}