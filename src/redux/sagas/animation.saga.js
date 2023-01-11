import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function* AnimationSaga() {
	yield takeLatest('DISPLAY_ANIMATION_VIEW', DisplayAnimation);
}

function* DisplayAnimation(action) {
	console.log('In DisplayAnimation: ', action.payload);
	try {
		const animation = yield axios.get(`/animation/${action.payload}`);
		console.log('Animation after router.get : ', animation.data);
		yield put({ type: 'SET_ANIMATION', payload: animation.data[0] });
	} catch (error) {
		console.log('Error in DisplayAnimation Generator: ', error);
	}
}

export default AnimationSaga;
