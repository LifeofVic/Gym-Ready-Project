const { query } = require('express');
const express = require('express');
const { useSelector } = require('react-redux');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/userId', (req, res) => {
	console.log('We are in the router.get /workout');
	const userId = req.params.userId;
	const queryText = `SELECT * FROM "user" 
LEFT JOIN "schedule" ON "user".schedule_id = "schedule".id
LEFT JOIN "session" ON "schedule".id = "session".id
LEFT JOIN "exercise" ON "exercise_id" = "exercise".id
LEFT JOIN "set" ON "set_id" = "set".id
WHERE "user".id = $1;`;
	pool
		.query(queryText, [userId])
		.then(result => {
			console.log('result.rows from getting all user row data: ', result.rows);
			res.send(result.rows);
		})
		.catch(error => {
			console.log('error is routine.router / router.get', error);
			res.sendStatus(500);
		});
});

router.post('/routine', async (req, res) => {
	const dayofWeek = req.body.day;
	const exerciseId = req.body.exerciseId;
	// const userId = req.body;
	console.log('req.body is:  ', req.body);

	console.log('Day of the week: ', dayofWeek);
	console.log('Exercise id: ', exerciseId);

	var storedValue = [];
	// This will temporarily store the returning id value which will be used
	//later on.
	function setValue(returnValue) {
		storedValue.push(returnValue);
		console.log('Returning ID is stored here: ', storedValue);
	}
	const connection = await pool.connect();
	try {
		await connection.query('BEGIN;');
		//This will insert the exercise id into the SESSION table creating a row that will then be assigned to a users schedule table.
		const firstText = `INSERT INTO session ("exercise_id") VALUES ($1) RETURNING id;`;

		await connection.query(firstText, [exerciseId], function (err, result) {
			if (err) {
				throw err;
			} else {
				setValue(result.rows[0].id);
			}
		});
		//! not working
		// const secondText = `UPDATE "schedule" SET $1 = ${storedValue[0]} WHERE "id" = 1;`;
		// await connection.query(secondText, [dayofWeek]);
	} catch (error) {
		console.log(error);
		await connection.query('ROLLBACK');
		res.sendStatus(500);
	} finally {
		connection.release();
	}
});

module.exports = router;
