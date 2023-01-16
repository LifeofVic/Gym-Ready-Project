const AnimationView = (state = {}, action) => {
	switch (action.type) {
		case 'SET_ANIMATION':
			return action.payload;
		default:
			return state;
	}
};

export default AnimationView;
