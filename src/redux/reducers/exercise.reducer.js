const exerciseReducer = (state = {}, action) => {
	switch (action.type) {
		case 'EXERCISE_BY_GROUP':
			return action.payload;
		case 'CLEAR_EXERCISE':
			return {};
		default:
			return state;
	}
};

export default exerciseReducer;
