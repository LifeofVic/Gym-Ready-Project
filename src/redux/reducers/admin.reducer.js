const Admin = (state = [], action) => {
	switch (action.type) {
		case 'ADMIN_ACCESS':
			return action.payload;
		default:
			return state;
	}
};

export default Admin;
