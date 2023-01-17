import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import './Animation.css';
import { useEffect, useState } from 'react';

export default function AnimationView() {
	console.log('Here in Animation View');
	// const Exercise = useSelector(store => store.animation);
	// console.log('Current State of AnimationView: ', Exercise);
	// const Animation = useSelector(store => store.favorite.FavoriteList);
	// const [exerciseAnimation, setExerciseAnimation] = useState([]);
	// console.log(Animation);
	// setExerciseAnimation(Animation);
	const ViewExercise = useSelector(store => store.animation);
	// console.log('Exercise Animation: ', exerciseAnimation);
	const history = useHistory();

	const BackToFavPage = () => {
		history.push('/favorite');
	};

	return (
		<>
			<h3 id='exercise-name-animation'>
				{ViewExercise.exercise_name.toUpperCase()}
			</h3>
			<div className='animation-view-container'>
				<img
					src={ViewExercise.gif_url}
					height='400'
					width='350'
					id='animation-view'
				/>
			</div>
			<Grid align='center'>
				<Button
					onClick={BackToFavPage}
					variant='contained'
					sx={{ width: '130pt' }}>
					Back
				</Button>
			</Grid>
		</>
	);
}
