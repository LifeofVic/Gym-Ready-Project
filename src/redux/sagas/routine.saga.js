import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* routineSaga() {
	yield takeLatest('SET_DAY_SELECTED', DaySelected);
}

function* DaySelected(action) {
	console.log(
		'In DaySelected  generator / routine.Saga  ,',
		action.type,
		action.payload
	);
}

export default routineSaga;
