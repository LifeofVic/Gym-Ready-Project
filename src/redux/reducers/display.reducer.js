const displayExercise = (state = [], action) => {
	switch (action.type) {
		case 'DISPLAY_EXERCISE':
			console.log('Exercise reducer: ', action.payload);
			return action.payload;
		case 'CLEAR_DISPLAY_EXERCISE':
			return [];
		default:
			return state;
	}
};

export default displayExercise;
