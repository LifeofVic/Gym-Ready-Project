import React from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function TodaysWorkout() {
	return (
		<div className='container'>
			<p>Todays Workout View</p>
			<p>Will List all the exercise associated with todays day.</p>
		</div>
	);
}

export default TodaysWorkout;
