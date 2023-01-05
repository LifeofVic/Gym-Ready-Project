const { response } = require('express');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//! This is no being longer being used, initial testing purpose
// router.get('/', (req, res) => {
// 	console.log('In the exercise.Router', req.body);
// 	//let randomNumber = Math.random() * (1327 - 1) + 1; //!Not working
// 	const queryText = `SELECT "exercise_name" FROM "exercise" WHERE "id" = 34;`;
// 	console.log('In Exercise router!');
// 	pool
// 		.query(queryText)
// 		.then(result => {
// 			res.send(result.rows);
// 		})
// 		.catch(err => {
// 			console.log(
// 				'Error in getting a random Exercise from DB using exercise.router: ',
// 				err
// 			);
// 			res.sendStatus(500);
// 		});
// });

//This will run the SQL that will also contain the string for the muscle_group.
//The result for this will contain an array of objects that each object will hold the exercises
// correlated wit the same muscle_group name.
router.get('/:musclegroup', (req, res) => {
	const musclegroup = req.params.musclegroup;
	console.log(
		'Returning all exercise with the following muscle group: ',
		musclegroup
	);
	const queryText = `SELECT * FROM "exercise" WHERE "muscle_group" = $1;`;
	pool
		.query(queryText, [musclegroup])
		.then(result => {
			res.send(result.rows);
			console.log('Result.row is: ', result.rows);
		})
		.catch(error => {
			console.log('Error in  Get /:musclegroup / exercise.router ', error);
			res.sendStatus(500);
		});
}); //End of Router.Get

// router.get('/:exerciseName', (req, res) => {
// 	const exerciseName = req.params.exerciseName;
// 	console.log(
// 		'Going to look for the object containing the property [exercise_name ] = ',
// 		exerciseName
// 	);
// 	const queryText = `SELECT * FROM "exercise" WHERE "exercise_name" = $1;`;

// 	pool
// 		.query(queryText, [exerciseName])
// 		.then(result => {
// 			res.send(result.rows);
// 			console.log('Result rows: [exercise object]', result.rows);

// 		})
// 		.catch(error => {
// 			console.log('Error in GET /:exerciseGif / exercise.Router', error);
// 			res.sendStatus(500);
// 		});
// });

/**
 * POST route template
 */
router.post('/', (req, res) => {
	// POST route code here
});

module.exports = router;
