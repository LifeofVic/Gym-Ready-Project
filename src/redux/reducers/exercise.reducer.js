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

const InsertGroup = (state = [], action) => {
	switch (action.type) {
		case 'INSERT_EXERCISE':
			return action.payload;
		default:
			return state;
	}
};

const FilteredExercises = (state = [], action) => {
	switch (action.type) {
		case 'FILTERED_EXERCISE':
			return action.payload;
		default:
			return state;
	}
};

const AllExercises = (state = [], action) => {
	switch (action.type) {
		case 'ALL_EXERCISES_ARRAY':
			return action.payload;
		default:
			return state;
	}
};

export default combineReducers({
	exerciseGroup,
	FilteredExercises,
	InsertGroup,
	AllExercises,
});
