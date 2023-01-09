import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* exerciseSaga() {
	yield takeLatest('EXERCISE_BY_GROUP', ExerciseByGroup);
	yield takeLatest('INSERT_GROUPED_EXERCISE', InsertByGroup);
}

//? This will receive the desired exercises by muscle group.
// Sending the action.payload that contains the string of the muscle_group selected by the user. assigning that to exerciseByGroup
// exerciseByGroup will then be sent to the reducer by ( yield put ) where it will be set to be used globally.
function* ExerciseByGroup(action) {
	console.log('In Exercise by group', '1:', action.type, '2:', action.payload);
	try {
		const exerciseByGroup = yield axios.get(`/exercise/${action.payload}`);
		console.log('Exercise By Group is: ', exerciseByGroup.data);
		yield put({
			type: 'SET_GROUPED_EXERCISE',
			payload: exerciseByGroup.data,
		});
	} catch (error) {
		console.log('Error in exercise.saga / ExerciseByGroup / ');
	}
}

function* InsertByGroup(action) {
	console.log('In Exercise by group', '1:', action.type, '2:', action.payload);
	try {
		const exerciseByGroup = yield axios.get(
			`/exercise/Insert/${action.payload}`
		);
		console.log('Exercise By Group is: ', exerciseByGroup.data);
		yield put({
			type: 'INSERT_EXERCISE',
			payload: exerciseByGroup.data,
		});
	} catch (error) {
		console.log('Error in exercise.saga / ExerciseByGroup / ');
	}
}

export default exerciseSaga;
