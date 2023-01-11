import '../Dashboard/Dashboard.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function AdminView() {
	const user = useSelector(store => store.user);
	console.log('USER info: ', user);

	const dispatch = useDispatch();

	dispatch({ type: 'FETCH_EVERY_FAVORITE', payload: user });

	return (
		<div>
			<h1> WE are view admin page</h1>
		</div>
	);
}
