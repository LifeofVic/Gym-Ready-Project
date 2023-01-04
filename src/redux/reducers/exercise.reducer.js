const exerciseReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_GROUPED_EXERCISE':
			console.log('Exercise reducer: ', action.payload);
			return action.payload;
		case 'CLEAR_EXERCISE':
			return {};
		default:
			return state;
	}
};

export default exerciseReducer;
