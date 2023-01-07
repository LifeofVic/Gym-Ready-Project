const { response } = require('express');
const express = require('express');
const { useSelector } = require('react-redux');
const pool = require('../modules/pool');
const router = express.Router();

//const user = useSelector(store => store.user);
router.get('/:id', (req, res) => {
	//This will allow to get the users entire favorite table that contains the exercises that they favorite.
	console.log('Router.GET / Req.body: ', req.params.id);

	const userId = req.params.id;
	const sqlText = `SELECT "user_id", "favorites".id, "exercise_id", "muscle_group", "gif_url","exercise_name", "muscle_target" FROM "favorites" JOIN "exercise" 
  ON "exercise".id = "favorites".exercise_id
	WHERE "user_id" = $1`;
	pool
		.query(sqlText, [userId])
		.then(result => {
			res.send(result.rows);
		})
		.catch(error => {
			console.log('Error in ROUTER.GET / FAVORITE.ROUTER', error);
			res.sendStatus(500);
		});
});

router.post('/', (req, res) => {
	//This will send the exercise parameter to the TABLE favorites and assign each value accordingly.
	// let userId = req.body;
	// let newExerciseId = req.body.exercise[0].id;
	console.log('Router.POST / Req.body: ', req.body);
	// console.log('userID: ', req.body.user.id);
	// console.log('Exercise ID: ', req.body.exercise[0].id);
	console.log('Router.post / FAVORITE / reg.body', req.body);
	const sqlText = `INSERT INTO "favorites" ("user_id", "exercise_id") VALUES ($1, $2);`;
	const sqlValues = [req.body.user, req.body.exercise];

	pool
		.query(sqlText, sqlValues)
		.then(result => {
			console.log('SENT QUERY TO DB!!!');
			res.sendStatus(201);
		})
		.catch(err => {
			console.log('Error is found in favorite.route LINE 23', err);
			res.sendStatus(500);
		});
});

router.delete('/:favoriteId', (req, res) => {
	console.log('IN DELETE ROUTER');
	console.log('DELETE ROUTER / req.params: ', req.params);
	const sqlText = 'DELETE FROM "favorites" WHERE "id" = $1;';
	const exerciseId = Number(req.params.favoriteId);

	pool
		.query(sqlText, [exerciseId])
		.then(result => {
			console.log('DELETION SUCCESSFUL FROM DB!!!');
			res.sendStatus(200);
		})
		.catch(error => {
			console.log('Error code: ', error);
		});
});

module.exports = router;
