import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { useState } from 'react';

function* favoriteSaga() {
	yield takeLatest('SET_FAVORITE', setFavorite);
}

//This will send the object of the entire exercise the user chooses to save to their favorite table.
function* setFavorite(action) {
	console.log('In FavoriteSaga / setFunction generator', action.payload);
}
