import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import reduxSaga from 'redux-saga';
import React from 'react';
function* randomExercise(action) {
	console.log(
		'Making a random exercise request to db to display onto dashboard'
	);
	try {
		const randomExercise = yield axios.get('/exercise');
		console.log('Random Exercise is: ', randomExercise);
		yield put({ type: 'SET_RANDOM_EXERCISE', payload: randomExercise.data });
	} catch (error) {
		console.log(
			'Error in fetching from server random exercises using exercise.saga',
			error
		);
	}
}
//! This will receive the desired exercises by muscle group.
function* ExerciseByGroup(action) {
	console.log('In Exercise by group', action.type, action.payload);
	try {
		const exerciseByGroup = yield axios.get(`/exercise/${action.payload}`);
		console.log('Exercise By Group is: ', exerciseByGroup);
		yield put({
			type: 'SET_GROUPED_EXERCISE',
			payload: exerciseByGroup.data,
		});
	} catch (error) {
		console.log('Error in exercise.saga / ExerciseByGroup / ');
	}
}

function* exerciseSaga() {
	yield takeLatest('FETCH_RANDOM_EXERCISE', randomExercise);
	yield takeLatest('EXERCISE_BY_GROUP', ExerciseByGroup);
}

export default exerciseSaga;
