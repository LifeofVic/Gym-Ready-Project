const { response } = require('express');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */

//! This will return the gif_url property with the corresponding id number.
router.get('/', (req, res) => {
	console.log('In the exercise.Router', req.body);
	//let randomNumber = Math.random() * (1327 - 1) + 1; //!Not working
	const queryText = `SELECT "exercise_name" FROM "exercise" WHERE "id" = 34;`;
	console.log('In Exercise router!');
	pool
		.query(queryText)
		.then(result => {
			res.send(result.rows);
		})
		.catch(err => {
			console.log(
				'Error in getting a random Exercise from DB using exercise.router: ',
				err
			);
			res.sendStatus(500);
		});
});

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
		});
}); //End of Router.Get

/**
 * POST route template
 */
router.post('/', (req, res) => {
	// POST route code here
});

module.exports = router;
