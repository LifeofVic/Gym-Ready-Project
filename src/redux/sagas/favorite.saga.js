import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { useState } from 'react';

function* favoriteSaga() {
	yield takeLatest('SET_FAVORITE', setFavorite);
	yield takeLatest('FETCH_FAVORITE', getFavorite);
}
//This will send the object of the entire exercise the user chooses to save to their favorite table.
function* setFavorite(action) {
	console.log('In FavoriteSaga / setFunction generator', action.payload);
	// console.log('USER VALUE', action.payload.user);
	// console.log('EXERCISE VALUE', action.payload.exercise);
	try {
		yield axios.post(`/favorite`, action.payload);
		console.log('Action payload in Favorite Saga', action.payload);
	} catch (error) {
		console.log('Error in Favorite.Saga / setFavorite generator', error);
	}
}

function* getFavorite(action) {
	console.log('In Favorite.Saga / getFavorite Generator', action.payload.user);
	try {
		const favorites = yield axios.get(`/favorite/${action.payload.user}`);
		console.log('Axios.get results: ', favorites);
		yield put({ type: 'SET_FAVORITE_LIST', payload: favorites.data });
	} catch (error) {
		console.log('Error in favorite.saga / getFavorite generator', error);
	}
}

export default favoriteSaga;
