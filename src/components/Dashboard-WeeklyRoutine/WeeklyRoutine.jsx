import '../Dashboard-WeeklyRoutine/WeeklyRoutine.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function WeeklyRoutine() {
	const dispatch = useDispatch();
	const [displayRoutine, setRoutine] = useState([]);

	return (
		<div className='Weekly-Container'>
			<h3>Weekly Routine Component</h3>
			<p>
				This component will display all the day of the week with the
				corresponding workout name per day.
			</p>
		</div>
	);
}
