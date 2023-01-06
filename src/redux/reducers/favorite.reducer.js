import { combineReducers } from 'redux';

const Favorites = (state = [], action) => {
	switch (action.type) {
		case 'SET_FAVORITE_EXERCISE':
			console.log('FAVORITE reducer: ', action.payload);
			return state.push(action.payload);
		case 'CLEAR_FAVORITE':
			return [];
		default:
			return state;
	}
};

const FavoriteList = (state = [], action) => {
	switch (action.type) {
		case 'SET_FAVORITE_LIST':
			console.log('Favorite reducer: ', action.payload);
			return action.payload;
		case 'CLEAR_FAVORITES_LIST':
			return [];
		default:
			return state;
	}
};
export default combineReducers({ Favorites, FavoriteList });
