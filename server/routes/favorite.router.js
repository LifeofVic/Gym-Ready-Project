const { response } = require('express');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:userId', (req, res) => {
	//This will allow to get the users entire favorite table that contains the exercises that they favorited.
});

router.post('/', (req, res) => {
	//This will send the exercise parameter to the TABLE favorites and assign each value accordingly.
	let newExercise = req.body;
	const sqlText = `INSERT INTO favorite ()`;
});

module.exports = router;