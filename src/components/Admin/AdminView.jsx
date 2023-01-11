import '../Dashboard/Dashboard.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function AdminView() {
	const user = useSelector(store => store.user);

	const adminAccess = useSelector(store => store.admin);

	console.log('Current State of Admin Reducer: ', adminAccess);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: 'FETCH_EVERY_FAVORITE', payload: user.access_level });
	}, []);

	return (
		<div>
			<h1> WE are viewing the Admin page</h1>
		</div>
	);
}
