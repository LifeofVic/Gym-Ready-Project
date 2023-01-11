import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Animation.css';

export default function AnimationView() {
	console.log('Here in Animation View');
	const Exercise = useSelector(store => store.animation);
	console.log('Current State of AnimationView: ', Exercise);

	const history = useHistory();

	const BackToFavPage = () => {
		history.push('/favorite');
	};

	return (
		<>
			<div className='animation-view-container'>
				<img
					src={Exercise.gif_url}
					height='400'
					width='350'
					id='animation-view'
				/>
			</div>
			<Button onClick={BackToFavPage} variant='contained'>
				Back
			</Button>
		</>
	);
}
