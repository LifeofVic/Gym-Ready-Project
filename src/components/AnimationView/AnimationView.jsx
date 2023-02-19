import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";
import "./Animation.css";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";

export default function AnimationView() {
	console.log("Here in Animation View");
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
		history.push("/favorite");
	};

	return (
		<>
			<Typography
				sx={{
					backgroundColor: "gray",
					margin: 5,
					padding: 2,
					position: "sticky",
					borderRadius: 4,
					boxShadow: 10,
				}}
				textAlign='center'>
				{ViewExercise.exercise_name.toUpperCase()}
			</Typography>
			<Card
				className='animation-view-container'
				raised={true}
				sx={{ margin: 5, position: "100vw" }}>
				<img
					src={ViewExercise.gif_url}
					height='400'
					width='350'
					id='animation-view'
				/>
			</Card>
			<Grid align='center'>
				<Button
					onClick={BackToFavPage}
					variant='contained'
					sx={{ width: "130pt" }}>
					Back
				</Button>
			</Grid>
		</>
	);
}
