const { response } = require('express');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
	const sqlText = `SELECT * FROM "exercise" WHERE "id" = $1`;
	// const exerciseId = Number(req.params.id);
	const exerciseId = req.params.id;
	console.log('Router.get in Animation.Router / exerciseId: ', req.params.id);

	pool
		.query(sqlText, [exerciseId])
		.then(result => {
			res.send(result.rows);
		})
		.catch(error => {
			console.log('Error in router.get / animation.router : ', error);
			res.sendStatus(500);
		});
});

module.exports = router;
