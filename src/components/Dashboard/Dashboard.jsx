import "../Dashboard/Dashboard.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Button, Card, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Grid } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
	// this allows us to use <App /> in index.js

	// this component doesn't do much to start, just renders some user reducer info to the DOM
	const user = useSelector(store => store.user);

	const AllExercises = useSelector(store => store.exercise.AllExercises);

	const [RandomNumber, setRandomNumber] = useState(0);

	const dispatch = useDispatch();

	const Random = () => {
		const max = 1327;
		const min = 1;
		const random = Math.floor(Math.random() * (max - min) + min);
		console.log("Random Number is:  ", Number(random));
		setRandomNumber(random);
	};

	const saveExercise = () => {
		console.log("Clicked on Save");
		toast.success("Successfully added to Favorites!", {
			position: toast.POSITION.BOTTOM_CENTER,
		});
		dispatch({
			type: "SET_FAVORITE",
			payload: {
				user: user.id,
				exercise: AllExercises[RandomNumber].id,
			},
		});
	};

	useEffect(() => {
		dispatch({
			type: "GENERATE_RANDOM_EXERCISE",
		});
	}, []);

	const history = useHistory();

	if (AllExercises.length == 0) {
		return (
			<div className='body-container'>
				<div className='welcome'>
					<h2>Welcome, {user.username}!</h2>
				</div>

				<div>
					<button onClick={Random}>Suggestion ?</button>
				</div>
			</div>
		);
	} else {
		return (
			<div className='body-container'>
				<div className='welcome'>
					<h2>Welcome, {user.username}!</h2>
				</div>
				<Box textAlign='center'>
					<Button onClick={Random} variant='contained'>
						Suggestion <QuestionMarkIcon />
					</Button>
					<Button onClick={saveExercise} variant='contained'>
						Save
						<SaveIcon />
					</Button>
				</Box>

				{/* < className='suggestion-container' onClick={GoToSearch}> */}
				<Card className='suggestion-container' raised={true}>
					<Box className='home-exercise-gif'>
						<Typography>Muscle Group: </Typography>
						<Typography>{AllExercises[RandomNumber].muscle_group}</Typography>
					</Box>

					<Box className='home-exercise-group'>
						<Typography> Targeted Muscle: </Typography>
						<Typography>{AllExercises[RandomNumber].muscle_target}</Typography>
					</Box>

					<Box className='home-exercise-name'>
						<Typography> Exercise Name: </Typography>
						<Typography>{AllExercises[RandomNumber].exercise_name}</Typography>
					</Box>

					<Grid>
						<img src={AllExercises[RandomNumber].gif_url} />
					</Grid>
				</Card>
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
			</div>
		);
	}
}
export default Dashboard;
