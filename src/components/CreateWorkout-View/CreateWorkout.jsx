import React from 'react';
import '../CreateWorkout-View/CreateWorkout.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { number } from 'prop-types';

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
				{' '}
				{JSON.stringify(GroupedExercise.data)}
			</div>
			<div className='day-section'>
				<label class='switch'>
					<input type='checkbox' value='Sunday' />
					<span class='slider round'>Sunday</span>
				</label>

				<label class='switch'>
					<input type='checkbox' value='Monday' />
					<span class='slider round'>Monday</span>
				</label>

				<label class='switch'>
					<input type='checkbox' value='Tuesday' />
					<span class='slider round'>Tuesday</span>
				</label>

				<label class='switch'>
					<input type='checkbox' value='Wednesday' />
					<span class='slider round'>Wednesday</span>
				</label>

				<label class='switch'>
					<input type='checkbox' value='Thursday' />
					<span class='slider round'>Thursday</span>
				</label>

				<label class='switch'>
					<input type='checkbox' value='Friday' />
					<span class='slider round'>Friday</span>
				</label>

				<label class='switch'>
					<input type='checkbox' value='Saturday' />
					<span class='slider round'>Saturday</span>
				</label>
			</div>
			<button className='submit-btn'> Add Exercise</button>
		</>
	);
}
