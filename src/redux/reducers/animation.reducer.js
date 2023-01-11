const AnimationView = (state = [], action) => {
	switch (action.type) {
		case 'SET_ANIMATION':
			console.log('Animation reducer: ', action.payload);
			return action.payload;
		default:
			return state;
	}
};

export default AnimationView;
