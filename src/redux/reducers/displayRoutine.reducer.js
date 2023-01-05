const displayRoutine = (state = [], action) => {
	switch (action.type) {
		case 'SET_WORKOUT_ROUTINE':
			console.log('Exercise reducer: ', action.payload);
			return action.payload;
		case 'CLEAR_DISPLAY_ROUTINE':
			return [];
		default:
			return state;
	}
};

export default displayRoutine;
