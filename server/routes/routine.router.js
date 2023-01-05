const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
	// GET route code here
});
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
