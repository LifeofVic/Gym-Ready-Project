import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* randomExercise(action) {
	try {
		console.log(
			'Making a random exercise request to db to display onto dashboard'
		);
		const randomExercise = yield axios.get('/api/exercise');
		yield put({ type: 'SET_RANDOM_EXERCISE', payload: randomExercise });
	} catch (error) {
		console.log(
			'Error is fetching from server random exercises using exercise.saga'
		);
	}
}

function* exerciseSaga() {
	yield takeLatest('RANDOM_EXERCISE', randomExercise);
}

export default exerciseSaga;
