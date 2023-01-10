import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function* favoriteSaga() {
	yield takeLatest('SET_FAVORITE', setFavorite);
	yield takeLatest('FETCH_FAVORITE', getFavorite);
	yield takeLatest('DELETE_FAVORITE', deleteFavorite);
	yield takeLatest('CHANGE_TRUE_FALSE', LikeExercise);
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
	console.log(
		'In Favorite.Saga / deleteFavorite Generator',
		action.payload.exerciseID,
		action.payload.userID
	);
	//Create a delete sql call by passing in the exercise id that is found in the favorites table..action payload will have the values from when the delete button was clicked.
	try {
		const deleteFavorite = yield axios.delete(
			`/favorite/${action.payload.exerciseID}`
		);
		const favorites = yield axios.get(`/favorite/${action.payload.userID}`);
		yield put({ type: 'SET_FAVORITE_LIST', payload: favorites.data });
		console.log('DELETION SUCCESSFUL', deleteFavorite);
	} catch (error) {
		console.log('Error in favorite.saga / deleteFavorite generator', error);
	}
}

function* LikeExercise(action) {
	console.log(
		'In Favorite.Saga / LikeExercise Generator',
		action.payload.user.id,
		action.payload
	);
	try {
		const like = yield axios.put(
			`/favorite/${action.id}/${action.payload.boolean}`
		);
		console.log('Like results: ', like);

		const favorites = yield axios.get(`/favorite/${action.payload.user.id}`);
		yield put({ type: 'SET_FAVORITE_LIST', payload: favorites.data });
	} catch (error) {
		console.log('Error in favorite.Saga / LikeExercise Generator', error);
	}
}

export default favoriteSaga;
