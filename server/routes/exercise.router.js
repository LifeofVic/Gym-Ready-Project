const { response } = require('express');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//This will run the SQL that will also contain the string for the muscle_group.
//The result for this will contain an array of objects that each object will hold the exercises
// correlated wit the same muscle_group name.
router.get('/:musclegroup', (req, res) => {
	const musclegroup = req.params.musclegroup;
	console.log(
		'Returning all exercise with the following muscle group: ',
		musclegroup
	);
	const queryText = `SELECT  "muscle_group","muscle_target" FROM "exercise" 
WHERE "muscle_group" = $1 GROUP BY "muscle_group","muscle_target";`;
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

router.get(`/Insert/:musclegroup`, (req, res) => {
	const musclegroup = req.params.musclegroup;
	console.log(
		'Getting the target muscle options by muscle group: ',
		musclegroup
	);

	const sqlText = `SELECT "muscle_group", "muscle_target" FROM "exercise"
WHERE "muscle_group" = $1 GROUP BY "muscle_group", "muscle_target";`;

	pool
		.query(sqlText, [musclegroup])
		.then(result => {
			res.send(result.rows);
		})
		.catch(error => {
			console.log(
				'Error in Exercise.router / router.get / Insert/:musclegroup',
				error
			);
			res.sendStatus(500);
		});
});

router.get(`/:groupKeyword/:targetKeyword`, (req, res) => {
	const groupKeyword = req.params.groupKeyword;
	const targetKeyword = req.params.targetKeyword;

	console.log(
		'Group Keyword: ',
		groupKeyword,
		'Target Keyword: ',
		targetKeyword
	);

	const sqlText = `SELECT  "muscle_group","muscle_target", "exercise_name" 
									FROM "exercise" 
									WHERE "muscle_group" = $1 AND "muscle_target" = $2 
									GROUP BY "muscle_group","muscle_target", "exercise_name";`;
	pool
		.query(sqlText, [groupKeyword, targetKeyword])
		.then(result => {
			res.send(result.rows);
		})
		.catch(error => {
			console.log(
				'Error is found in Exercise.Router / :GroupKeyword / :TargetKeyword',
				error
			);
			res.sendStatus(500);
		});
});

module.exports = router;
