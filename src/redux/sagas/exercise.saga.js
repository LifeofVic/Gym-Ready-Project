import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

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

function* exerciseSaga() {
	yield takeLatest('FETCH_RANDOM_EXERCISE', randomExercise);
}

export default exerciseSaga;
