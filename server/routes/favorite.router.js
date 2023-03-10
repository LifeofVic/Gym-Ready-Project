const { response } = require('express');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
	rejectUnauthenticated,
} = require('../modules/authentication-middleware');

//! This will allow the admin to receive data from the database to see all the data from the favorite TABLE, as admin has an access_level of 10.
router.get('/admin/:id', rejectUnauthenticated, (req, res) => {
	const accessLevel = req.params.id;
	console.log('In favorite router, ');
	const sqlText = `SELECT "favorites".id, "user_id","username", "exercise_id", "exercise_name", "muscle_group", "muscle_target"
	FROM "favorites"
	JOIN "user" ON "user".id = "favorites".user_id
	JOIN "exercise" ON "exercise".id = "favorites".exercise_id 
	WHERE "access_level" <= $1;`;

	pool
		.query(sqlText, [accessLevel])
		.then(result => {
			res.send(result.rows);
		})
		.catch(error => {
			console.log('Error found in router.get / favorite.router ', error);
			res.sendStatus(500);
		});
});

//This will allow to get the users entire favorite table that contains the exercises that they favorite.
router.get('/:id', (req, res) => {
	console.log('Router.GET / Req.body: ', req.params.id);

	const userId = req.params.id;
	const sqlText = `SELECT "user_id", "favorites".id, "exercise_id", "muscle_group", "gif_url","exercise_name", "muscle_target", "like" FROM "favorites" JOIN "exercise" 
  ON "exercise".id = "favorites".exercise_id
	WHERE "user_id" = $1 ORDER BY "id" ASC`;
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
	console.log('DELETE ROUTER / req.params: ', req.params.favoriteId);
	const sqlText = `DELETE FROM "favorites" WHERE "id" = $1;`;
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

router.put('/:likeExerciseID/:TrueFalse', (req, res) => {
	const ExerciseID = req.params.likeExerciseID;
	const TrueFalse = req.params.TrueFalse;
	console.log(
		'In router.put',
		'Exercise ID in TABLE "favorites',
		ExerciseID,
		'Current '
	);
	const sqlText = `UPDATE "favorites" SET "like" = $1 WHERE "id" = $2 `;
	pool
		.query(sqlText, [TrueFalse, ExerciseID])
		.then(() => {
			console.log('UPDATE was Successful');
			res.sendStatus(200);
		})
		.catch(error => {
			console.log('Error found in router.put: ', error);
		});
});

module.exports = router;

//`UPDATE "todo" SET "IsComplete" = 'true' WHERE "id" = $1;`;
