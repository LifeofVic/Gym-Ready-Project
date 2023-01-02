const { response } = require('express');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
	console.log('In the exercise.Router', req.body);
	let randomNumber = Math.random() * (1327 - 1) + 1;
	const queryText = `SELECT * FROM "exercise" WHERE "id" = $1;`;
	console.log('In Exercise router!');
	pool
		.query(queryText, [randomNumber])
		.then(response => {
			res.send(response.data);
		})
		.catch(err => {
			console.log(
				'Error in getting a random Exercise from DB using exercise.router: ',
				err
			);
			res.sendStatus(500);
		});
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
	// POST route code here
});

module.exports = router;
