import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { useState } from 'react';

function* favoriteSaga() {
	yield takeLatest('SET_FAVORITE', setFavorite);
	yield takeLatest('FETCH_FAVORITE', getFavorite);
	yield takeLatest('DELETE_FAVORITE', deleteFavorite);
	yield takeLatest('SET_TO_LIKE', LikeExercise);
	yield takeLatest('UNLIKE', UnlikeExercise);
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

function* deleteFavorite(action) {
	console.log('In Favorite.Saga / deleteFavorite Generator', action.payload);
	//Create a delete sql call by passing in the exercise id that is found in the favorites table..action payload will have the values from when the delete button was clicked.
	try {
		const deleteFavorite = yield axios.delete(`/favorite/${action.payload}`);
		console.log('DELETION SUCCESSFUL', deleteFavorite);
	} catch (error) {
		console.log('Error in favorite.saga / deleteFavorite generator', error);
	}
}

function* LikeExercise(action) {
	console.log('In Favorite.Saga / LikeExercise Generator', action.payload);

	try {
		const like = yield axios.put(`/favorite/${action.id}/${action.payload}`);
		console.log('Like results: ', like);
	} catch (error) {
		console.log('Error in favorite.Saga / LikeExercise Generator', error);
	}
}

function* UnlikeExercise(action) {
	console.log('In Favorite.Saga / LikeExercise Generator', action.payload);
}
export default favoriteSaga;
