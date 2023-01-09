import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import '../InsertNewExercise/InsertExercise.css';
import { Card } from '@mui/material';

export default function InsertNewExercise() {
	console.log('In InsertNewExercise.JSX');

	const [muscleGroup, setMuscleGroup] = useState('');
	const [muscleTarget, setMuscleTarget] = useState('');
	const [exerciseGif, setExerciseGif] = useState('');
	const [exerciseName, setExerciseName] = useState('');

	const GroupOptions = useSelector(store => store.exercise.InsertGroup);
	console.log('Insert group is: ', GroupOptions);
	const dispatch = useDispatch();

	const setExerciseByGroup = e => {
		console.log('EXERCISE BY GROUP: ', e.target.value);
		setMuscleGroup(e.target.value);
		dispatch({ type: 'INSERT_GROUPED_EXERCISE', payload: e.target.value });
	};
	const setExerciseByTargetValue = e => {
		console.log('EXERCISE MUSCLE TARGET: ', e.target.value);
		setMuscleTarget(e.target.value);
	};

	const setExerciseURL = e => {
		//console.log('GIF URL: ', e.target.value);
		setExerciseGif(e.target.value);
	};

	return (
		<>
			<h2>THIS IS THE INSERT FORM</h2>
			<h5>This will send the inputs to the database</h5>

			<div className='content'>
				<select className='new-exercises-options' onChange={setExerciseByGroup}>
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
					className='new-exercises-options'
					onChange={setExerciseByTargetValue}>
					<option placeholder='Target Muscle'>Select</option>
					{GroupOptions.map((exercise, index) => {
						return (
							<option
								className='target-options'
								key={index}
								value={exercise.muscle_target}>
								{exercise.muscle_target}
							</option>
						);
					})}
				</select>

				<input
					id='user-input'
					placeholder='Exercise Name'
					type='text'
					onChange={setExerciseURL}
				/>

				<input
					id='user-input'
					placeholder='GIF URL'
					type='text'
					onChange={setExerciseURL}
				/>
			</div>
			<div>
				<Button variant='contained'>Submit</Button>
			</div>
		</>
	);
}
