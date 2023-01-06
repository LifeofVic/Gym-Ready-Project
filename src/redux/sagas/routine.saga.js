import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { useState } from 'react';

function* routineSaga() {
	yield takeLatest('SET_ROUTINE', RoutineCreation);
	yield takeLatest('FETCH_ROUTINE', FetchRoutine);
}

function* RoutineCreation(action) {
	console.log(
		'In RoutineCreation  generator / routine.Saga  ,',
		action.payload
	);

	try {
		const createWorkout = yield axios.post('/routine', action.payload);
		yield put({ type: 'SET_WORKOUT_ROUTINE', payload: createWorkout });
		console.log('Created work out', createWorkout);
	} catch (error) {
		console.log('Error in RoutineCreation / Routine.Saga', error);
	}
}

function* FetchRoutine(action) {
	console.log(`actions payload: [user's ID]`, action.payload);
	console.log('FetchWorkout Generator is working! ');
	try {
		const workoutFetched = yield axios.get(`/routine/${action.payload}`);
		console.log('WorkoutFetched from router is: ', workoutFetched);
		yield put({ type: 'SET_WORKOUT_TO_DISPLAY', payload: workoutFetched.data });
	} catch (error) {
		console.log('Error in FetchRoutine / Routine.Saga', error);
	}
}

export default routineSaga;
