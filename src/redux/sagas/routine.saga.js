import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* routineSaga() {
	yield takeLatest('SET_ROUTINE', RoutineCreation);
}

function* RoutineCreation(action) {
	console.log(
		'In DaySelected  generator / routine.Saga  ,',
		action.type,
		action.payload
	);

	try {
		const createWorkout = yield axios.post('/workout', action.payload);
		yield put({ type: 'SET_WORKOUT_ROUTINE', payload: createWorkout });
	} catch (error) {
		console.log('Error in RoutineCreation / Routine.Saga', error);
	}
}

export default routineSaga;
