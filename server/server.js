const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const exerciseRouter = require('./routes/exercise.router');
const routineRouter = require('./routes/routine.router');
const favoriteRouter = require('./routes/favorite.router');
const animationRouter = require('./routes/animation.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/exercise', exerciseRouter);
app.use('/routine', routineRouter);
app.use('/favorite', favoriteRouter);
app.use('/animation/', animationRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
