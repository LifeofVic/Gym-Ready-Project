import React, { useState } from 'react';
import '../CreateWorkout-View/CreateWorkout.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';

export default function InsertNewExercise() {
	console.log('In the Insert New Exercise file');

	return (
		<>
			<h2>THIS IS THE INSERT FORM</h2>
			<h5>This will send the inputs to the database</h5>
			<form>
				<input placeholder='Muscle Group'></input>
				<input placeholder='Exercise Name'></input>
				<input placeholder='Targeted Muscle'></input>
				<input placeholder='GIF URL'></input>
			</form>
			<button>Submit</button>
		</>
	);
}
