import React, { useState } from 'react';
import '../CreateWorkout-View/CreateWorkout.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { AlertTitle } from '@mui/material';

export default function CreateWorkout() {
	const dispatch = useDispatch();
	//This uses global state to bring in the array of objects with the same muscle_group which each object will contain:
	// id / muscle_group / gif_url / exercise_name / muscle_target
	const GroupedExercise = useSelector(store => store.exercise.exerciseGroup);
	const FilterExercises = useSelector(
		store => store.exercise.FilteredExercises
	);

	const [alert, setAlert] = useState(false);

	const user = useSelector(store => store.user);

	//Will store the a string used for the animation.
	const [ExerciseGif, setExerciseGif] = useState();
	// Stores the number value the selected Exercise from the drop down list of exercise.
	const [ExerciseId, setExerciseId] = useState(0);

	const history = useHistory();

	const [GroupKeyword, setGroupKeyword] = useState('');
	const [TargetKeyword, setTargetKeyword] = useState('');

	// This will send the muscle_group value of data type (string) to the exercise.Saga and set result.row to the [store.exercise] where all the exercises with that muscle_group will store in.   GroupedExercise.
	const ExerciseByGroup = e => {
		e.preventDefault();
		setGroupKeyword(e.target.value);
		console.log('Value is: ', e.target.value);
		dispatch({ type: 'EXERCISE_BY_GROUP', payload: e.target.value });
	};

	const ExerciseByTarget = e => {
		console.log('In Second Drop Down');
		setTargetKeyword(e.target.value);

		dispatch({
			type: 'FILTER_EXERCISES_BY_KEYWORDS',
			payload: { GroupKeyword: GroupKeyword, TargetKeyword: e.target.value },
		});
	};
	//utilizing the filter method to look through the global store of the grouped exercises and find the one
	//with the id value as the one event.target.value
	const SetValues = event => {
		setExerciseId(Number(event.target.value));
		console.log('Selected Exercise ID is: ', event.target.value);

		let findGif = FilterExercises.filter(
			object => object.id == Number(event.target.value)
		);
		setExerciseGif(findGif[0].gif_url);
		console.log('GIF URL SELECTED IS: ', findGif[0]);
	};
	//This will run where the event handler will set those values into the corresponding local state to be used in the [AddExercise] once the 'Add Exercise' button is clicked on.
	//TODO FIX THIS ALSO
	const AddExercise = () => {
		//!conditional where the 2 drop down menus is not selected then display alert.
		if (GroupKeyword != '' && TargetKeyword != '' && ExerciseId != '') {
			setAlert(true);
			const exerciseObject = FilterExercises.filter(
				object => object.id == ExerciseId
			);

			console.log(
				'exercise object is: ',
				exerciseObject[0].id,
				'user data:',
				user.id
			);
			dispatch({
				type: 'SET_FAVORITE',
				payload: { exercise: exerciseObject[0].id, user: user.id },
			});
			document.getElementById('muscle-group').selectedIndex = 0;
			document.getElementById('exercise-list-by-group').selectedIndex = 0;
			document.getElementById('Target-group-selector').selectedIndex = 0;
			setExerciseGif('');
			setExerciseId('');
		} else {
			console.log('UNABLE TO ADD BLANK ITEMS');
			<Alert severity='error'>
				<AlertTitle> Error</AlertTitle>
				UNABLE TO ADD BLANK ITEMS
			</Alert>;
		}
	};

	// const HandleClick = () => {
	// 	console.log('Add New Exercise had been Clicked!');
	// 	history.push('/InsertNewExercise');
	// };

	return (
		<>
			{/* <header className='Create-Workout-Header'>Create Your Workout</header> */}
			<div className='filter-section'>
				<select
					placeholder='Muscle-Group'
					id='muscle-group'
					onChange={ExerciseByGroup}>
					<option>Select Muscle Group</option>
					<option value='chest' key={1}>
						Chest
					</option>
					<option value='back' key={2}>
						Back
					</option>
					<option value='cardio' key={3}>
						Cardio
					</option>
					<option value='lower arms' key={4}>
						Lower Arms
					</option>
					<option value='waist' key={6}>
						Waist
					</option>
					<option value='shoulders' key={7}>
						Shoulders
					</option>
					<option value='lower legs' key={8}>
						Lower Legs
					</option>
					<option value='neck' key={9}>
						Neck
					</option>
					<option value='upper arms' key={10}>
						Upper Arms
					</option>
					<option value='upper legs' key={11}>
						Upper Legs
					</option>
				</select>

				<select
					placeholder='Target Muscle'
					id='Target-group-selector'
					onChange={ExerciseByTarget}>
					<option>Select Specific Muscle </option>
					{GroupedExercise.map((exercise, index) => {
						return (
							<option className='Drop-List' key={index} value={exercise.id}>
								{exercise.muscle_target}
							</option>
						);
					})}
				</select>

				<select
					placeholder='Exercise'
					className='exercise-list'
					id='exercise-list-by-group'
					onChange={SetValues}>
					<option>Select Exercise </option>
					{FilterExercises.map(exercise => {
						return (
							<option
								className='Drop-List'
								key={exercise.id}
								value={exercise.id}>
								{exercise.exercise_name}
							</option>
						);
					})}
				</select>

				{/* <input type='number' placeholder='# of sets'></input> */}
			</div>
			{/* {JSON.stringify({ ExerciseGif })} */}
			<div className='exercise-detail'>
				<img src={ExerciseGif} />
			</div>
			<div>
				<Button
					className='submit-btn'
					onClick={AddExercise}
					variant='contained'
					style={{ maxWidth: '250px', color: 'white' }}>
					Add To Favorite
				</Button>
			</div>
		</>
	);
}

//! This will allow the exercises names to be displayed onto the DOM in the dropdown filter.
/* {GroupedExercise.map(exercise => {
					return (
						<>
							<p> {exercise.exercise_name} </p>
						</>
					);
				})} */
