import { combineReducers } from 'redux';

const exerciseGroup = (state = [], action) => {
	switch (action.type) {
		case 'SET_GROUPED_EXERCISE':
			console.log('Exercise reducer: ', action.payload);
			return action.payload;
		case 'ADD_EXERCISE':
			return [];
		default:
			return state;
	}
};

export default exerciseGroup;
