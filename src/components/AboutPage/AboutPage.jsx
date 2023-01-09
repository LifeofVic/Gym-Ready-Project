import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
	return (
		<div className='container'>
			<div>
				<p>
					Gym Ready is for user to look through various exercises that will be
					helpful on their next workout. This holds a library of many exercies.
				</p>
			</div>
		</div>
	);
}

export default AboutPage;
