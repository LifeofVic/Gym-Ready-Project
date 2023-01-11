import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* exerciseSaga() {
	yield takeLatest('EXERCISE_BY_GROUP', ExerciseByGroup);
	yield takeLatest('INSERT_GROUPED_EXERCISE', InsertByGroup);
	yield takeLatest('FILTER_EXERCISES_BY_KEYWORDS', KeywordFilters);
	yield takeLatest('GENERATE_RANDOM_EXERCISE', RandomExercise);
}

//? This will receive the desired exercises by muscle group.
// Sending the action.payload that contains the string of the muscle_group selected by the user. assigning that to exerciseByGroup
// exerciseByGroup will then be sent to the reducer by ( yield put ) where it will be set to be used globally.
function* ExerciseByGroup(action) {
	console.log('In Exercise by group', '1:', action.type, '2:', action.payload);
	try {
		const exerciseByGroup = yield axios.get(`/exercise/${action.payload}`);
		console.log('Exercise By Group is: ', exerciseByGroup.data);
		yield put({
			type: 'SET_GROUPED_EXERCISE',
			payload: exerciseByGroup.data,
		});
	} catch (error) {
		console.log('Error in exercise.saga / ExerciseByGroup / ');
	}
}

function* InsertByGroup(action) {
	console.log('In Exercise by group', '1:', action.type, '2:', action.payload);
	try {
		const exerciseByGroup = yield axios.get(
			`/exercise/Insert/${action.payload}`
		);
		console.log('Exercise By Group is: ', exerciseByGroup.data);
		yield put({
			type: 'INSERT_EXERCISE',
			payload: exerciseByGroup.data,
		});
	} catch (error) {
		console.log('Error in exercise.saga / ExerciseByGroup / ');
	}
}

function* KeywordFilters(action) {
	console.log(
		'Keywords: ',
		action.payload.GroupKeyword,
		action.payload.TargetKeyword
	);
	try {
		const FilteredExercises = yield axios.get(
			`/exercise/${action.payload.GroupKeyword}/${action.payload.TargetKeyword}`
		);
		yield put({ type: 'FILTERED_EXERCISE', payload: FilteredExercises.data });
	} catch (error) {
		console.log('Error in KeywordFilter: ', error);
	}
}

function* RandomExercise(action) {
	console.log('Random exercise generator: ');

	try {
		const ExerciseArray = yield axios.get(`/exercise`);
		yield put({ type: 'ALL_EXERCISES_ARRAY', payload: ExerciseArray.data });
	} catch (error) {
		console.log('Error in Random Exercise generator');
	}
}
export default exerciseSaga;
