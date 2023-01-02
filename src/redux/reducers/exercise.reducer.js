const exerciseReducer = (state = {}, action) => {
	switch (action.type) {
		case 'RANDOM_EXERCISE':
			return action.payload;
		case 'CLEAR_EXERCISE':
			return {};
		default:
			return state;
	}
};

export default exerciseReducer;
