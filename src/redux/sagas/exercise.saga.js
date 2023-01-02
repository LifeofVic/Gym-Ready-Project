import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* randomExercise(action) {
	try {
		yield put({ type: 'RANDOM_EXERCISE' });
		yield axios.get('/api/exercise');
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
