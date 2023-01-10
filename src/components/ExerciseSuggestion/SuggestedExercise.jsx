import './SuggestedExercise.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function SuggestedExercise() {
	const dispatch = useDispatch();

	const randomNum = Math.random() * (max - min) + min;
	const max = 1327;
	const min = 1;
	const Random = () => {
		const random = Math.floor(Math.random() * (max - min) + min);
		console.log('Random Number is:  ', random);
		// !dispatch({  type: }) ------------------------------------------------
	};

	console.log('Random Number is:  ', randomNum);

	return (
		<div className='Weekly-Container'>
			<h3>Suggestion Component</h3>
			<p>Suggest an Exercise by generating a random animation.</p>
			<button onClick={Random}>RANDOM</button>
		</div>
	);
}
