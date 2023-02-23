import React, { useState } from "react";
import "../CreateWorkout-View/CreateWorkout.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";

import { AlertTitle, Card, Grid, InputLabel } from "@mui/material";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

import "react-toastify/dist/ReactToastify.css";

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

	const [GroupKeyword, setGroupKeyword] = useState("");
	const [TargetKeyword, setTargetKeyword] = useState("");
	const [ExerciseName, setExerciseName] = useState("");

	// This will send the muscle_group value of data type (string) to the exercise.Saga and set result.row to the [store.exercise] where all the exercises with that muscle_group will store in.   GroupedExercise.
	const ExerciseByGroup = e => {
		e.preventDefault();
		setGroupKeyword(e.target.value);
		console.log("Value is: ", e.target.value);
		dispatch({ type: "EXERCISE_BY_GROUP", payload: e.target.value });
	};

	const ExerciseByTarget = e => {
		console.log("In Second Drop Down");
		setTargetKeyword(e.target.value);

		dispatch({
			type: "FILTER_EXERCISES_BY_KEYWORDS",
			payload: { GroupKeyword: GroupKeyword, TargetKeyword: e.target.value },
		});
	};
	//utilizing the filter method to look through the global store of the grouped exercises and find the one
	//with the id value as the one event.target.value
	const SetValues = event => {
		setExerciseId(Number(event.target.value));
		console.log("Selected Exercise ID is: ", event.target.value);

		let findGif = FilterExercises.filter(
			object => object.id == Number(event.target.value)
		);
		setExerciseGif(findGif[0].gif_url);
		console.log("GIF URL SELECTED IS: ", findGif[0]);
	};
	//This will run where the event handler will set those values into the corresponding local state to be used in the [AddExercise] once the 'Add Exercise' button is clicked on.
	//TODO FIX THIS ALSO
	const AddExercise = () => {
		//!conditional where the 2 drop down menus is not selected then display alert.
		if (GroupKeyword != "" && TargetKeyword != "" && ExerciseId != "") {
			setAlert(true);
			toast.success("Successfully added to Favorites!", {
				position: toast.POSITION.BOTTOM_CENTER,
			});
			const exerciseObject = FilterExercises.filter(
				object => object.id == ExerciseId
			);

			console.log(
				"exercise object is: ",
				exerciseObject[0].id,
				"user data:",
				user.id
			);
			dispatch({
				type: "SET_FAVORITE",
				payload: { exercise: exerciseObject[0].id, user: user.id },
			});
			document.getElementById("muscle-group").selectedIndex = 0;
			document.getElementById("exercise-list-by-group").selectedIndex = 0;
			document.getElementById("Target-group-selector").selectedIndex = 0;
			setExerciseGif("");
			setExerciseId("");
		} else {
			console.log("UNABLE TO ADD BLANK ITEMS");
			toast.warn("Please Select an Exercise!", {
				position: toast.POSITION.BOTTOM_CENTER,
			});
		}
	};

	// const HandleClick = () => {
	// 	console.log('Add New Exercise had been Clicked!');
	// 	history.push('/InsertNewExercise');
	// };

	return (
		<>
			<Grid align='center'>
				<h1 className='Search-Exercise-Header'>Search Exercise 🔎</h1>
			</Grid>
			<Card className='filter-section' raised={true}>
				<Box alignContent={"center"} textAlign='center'>
					<Box>
						<InputLabel>Select Muscle Group</InputLabel>
						<Select
							label={"Select Muscle group"}
							value={GroupKeyword}
							id='muscle-group'
							onChange={ExerciseByGroup}
							sx={{ minWidth: "50%" }}>
							<MenuItem value='chest' key='chest'>
								Chest
							</MenuItem>
							<MenuItem value='back' key='back'>
								Back
							</MenuItem>
							<MenuItem value='cardio' key='cardio'>
								Cardio
							</MenuItem>
							<MenuItem value='lower arms' key='lower arms'>
								Lower Arms
							</MenuItem>
							<MenuItem value='waist' key='waist'>
								Waist
							</MenuItem>
							<MenuItem value='shoulders' key='shoulder'>
								Shoulders
							</MenuItem>
							<MenuItem value='lower legs' key='lower legs'>
								Lower Legs
							</MenuItem>
							<MenuItem value='neck' key='neck'>
								Neck
							</MenuItem>
							<MenuItem value='upper arms' key='upper arms'>
								Upper Arms
							</MenuItem>
							<MenuItem value='upper legs' key='upper legs'>
								Upper Legs
							</MenuItem>
						</Select>
					</Box>
					<Box>
						<InputLabel>Select Specific Muscle</InputLabel>
						<Select
							id='Target-group-selector'
							value={TargetKeyword.muscle_target}
							onChange={ExerciseByTarget}
							sx={{ minWidth: "50%" }}>
							<MenuItem>Select Specific Muscle </MenuItem>
							{GroupedExercise.map((exercise, index) => {
								return (
									<MenuItem
										className='Drop-List'
										key={index}
										value={exercise}
										id={exercise.muscle_target}>
										{exercise.muscle_target}
									</MenuItem>
								);
							})}
						</Select>
					</Box>
					<Box>
						<InputLabel>Select Exercise </InputLabel>
						<Select
							className='exercise-list'
							id='exercise-list-by-group'
							value={ExerciseName.muscle_target}
							onChange={SetValues}
							sx={{ width: "100vw", height: "30px" }}>
							{FilterExercises.map(exercise => {
								return (
									<MenuItem
										className='Drop-List'
										key={exercise.id}
										value={exercise.id}>
										{exercise.exercise_name}
									</MenuItem>
								);
							})}
						</Select>
					</Box>
				</Box>
			</Card>

			<Card className='exercise-detail' raised={true}>
				<img src={ExerciseGif} />
			</Card>
			<Box textAlign='center'>
				<Button
					className='submit-btn'
					onClick={AddExercise}
					variant='contained'
					style={{ color: "white" }}>
					Add To Favorite
				</Button>
			</Box>
			<ToastContainer
				position='bottom-center'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover
				theme='light'
			/>
		</>
	);
}
