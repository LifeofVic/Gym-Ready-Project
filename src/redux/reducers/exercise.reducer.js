import { combineReducers } from 'redux';

const exerciseGroup = (state = [], action) => {
	switch (action.type) {
		case 'SET_GROUPED_EXERCISE':
			console.log('Exercise reducer: ', action.payload);
			return action.payload;
		case 'CLEAR_EXERCISE':
			return [];
		default:
			return state;
	}
};

// const displayExercise = (state = [], action) => {
// 	switch (action.type) {
// 		case 'DISPLAY_EXERCISE':
// 			console.log('Exercise reducer: ', action.payload);
// 			return action.payload;
// 		case 'CLEAR_DISPLAY_EXERCISE':
// 			return [];
// 		default:
// 			return state;
// 	}
//};

export default exerciseGroup;
