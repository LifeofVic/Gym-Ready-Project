const Favorites = (state = [], action) => {
	switch (action.type) {
		case 'SET_FAVORITE_EXERCISE':
			console.log('FAVORITE reducer: ', action.payload);
			return state.push(action.payload);
		case 'CLEAR_FAVORITE':
			return [];
		default:
			return state;
	}
};

export default Favorites;
