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

				<input placeholder='Exercise'></input>
				<input placeholder='# of sets'></input>
			</div>
			<div className='exercise-detail'>
				{' '}
				{JSON.stringify(GroupedExercise.data)}
			</div>
			<div className='day-section'></div>
		</>
	);
}
