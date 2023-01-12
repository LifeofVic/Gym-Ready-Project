import '../Dashboard/Dashboard.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Admin.css';

export default function AdminView() {
	const user = useSelector(store => store.user);

	const adminAccess = useSelector(store => store.admin);

	console.log('Current State of Admin Reducer: ', adminAccess);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: 'FETCH_EVERY_FAVORITE', payload: user.access_level });
	}, []);

	return (
		<div className='admin-content'>
			<div className='admin-view-header'>
				<h2> Admin View</h2>
			</div>
			<table className='admin-table'>
				<tr>
					<th>ID</th>
					<th>User</th>
					<th>Exercise Name</th>
				</tr>
				{adminAccess.map((favorite, index) => {
					return (
						<tr className='user-content-row'>
							<td id='admin-users-id'>{favorite.user_id}</td>
							<td id='admin-users-username'>{favorite.username}</td>
							<td id='admin-users-exercise'>{favorite.exercise_name}</td>
						</tr>
					);
				})}
			</table>
		</div>
	);
}
