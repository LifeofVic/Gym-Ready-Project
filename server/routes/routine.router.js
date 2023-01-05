const { query } = require('express');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/workout', (req, res) => {
	const queryText = `SELECT * FROM "user" 
LEFT JOIN "schedule" ON "user".schedule_id = "schedule".id
LEFT JOIN "session" ON "schedule".id = "session".id
LEFT JOIN "exercise" ON "exercise_id" = "exercise".id
LEFT JOIN "set" ON "set_id" = "set".id
WHERE "user".id = 1;`;
	console.log('req is: ', req.body);
	pool
		.query(queryText)
		.then(result => {
			res.send(result.rows);
			console.log('result.rows from getting all user row data: ', result.rows);
			res.sendStatus(200);
		})
		.catch(error => {
			console.log('error is routine.router / router.get', error);
			res.sendStatus(500);
		});
}); //END OF Router.GET

/**
 * POST route template
 */

router.post('/workout', async (req, res) => {
	const DayRoutine = req.body.day;
	const ExerciseId = req.body.exerciseId;

	var storedValue = [];

	function setValue(returnValue) {
		returnValue = this.returnValue;
		console.log('Returning ID is stored here: ', storedValue);
	}
	const connection = await pool.connect();
	try {
		await connection.query('BEGIN;');
		const queryText = `INSERT INTO "session" ("exercise_id") VALUES ($1) RETURNING id;`;

		await connection.query(queryText, [ExerciseId], function (err, returnId) {
			if (err) {
				throw err;
			} else {
				setValue(returnId);
			}
		});
	} catch (error) {
		console.log(err);
		await connection.query('ROLLBACK');
		res.sendStatus(500);
	} finally {
		connection.release();
	}

	// POST route code here
});

module.exports = router;
