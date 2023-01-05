const displayRoutine = (state = [], action) => {
	switch (action.type) {
		case 'DISPLAY_ROUTINE':
			console.log('Exercise reducer: ', action.payload);
			return action.payload;
		case 'CLEAR_DISPLAY_ROUTINE':
			return [];
		default:
			return state;
	}
};

export default displayRoutine;
