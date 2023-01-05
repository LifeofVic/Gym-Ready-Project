import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* routineSaga() {
	yield takeLatest('SET_ROUTINE', RoutineCreation);
	yield takeLatest('FETCH_ROUTINE', FetchWorkout);
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

function* FetchWorkout(action) {
	console.log('action: ', action.type);
	console.log('FetchWorkout Generator is working! ');
	try {
		const workoutFetched = yield axios.get('/todaysworkout');
		console.log('WorkoutFetched from router is: ', workoutFetched);
		yield put({ type: 'SET_WORKOUT_TO_DISPLAY', payload: workoutFetched.data });
	} catch (error) {
		console.log('Error in FetchWorkout / Routine.Saga', error);
	}
}

export default routineSaga;
