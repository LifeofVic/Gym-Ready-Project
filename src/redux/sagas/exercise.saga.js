import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* exerciseSaga() {
	yield takeLatest('FETCH_RANDOM_EXERCISE', randomExercise);
	yield takeLatest('EXERCISE_BY_GROUP', ExerciseByGroup);
	yield takeLatest('DISPLAY_EXERCISE', ExerciseDisplay);
}

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

function* ExerciseDisplay(action) {
	console.log('In ExerciseDisplay Saga, ', action.type, action.payload);
	try {
		const ExerciseGif = yield axios.get(`/:exerciseGif/${action.payload}`);
		console.log('Exercise object from DB: ', ExerciseGif.data);
		yield put({
			type: 'SET_SELECTED_EXERCISE',
			payload: ExerciseGif.data,
		});
	} catch (err) {
		console.log('Error in exercise.saga / ExerciseDisplay');
	}
}

export default exerciseSaga;
