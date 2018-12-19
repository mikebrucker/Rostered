import authReducer from './authReducer';
import playerReducer from './playerReducer';
import teamReducer from './teamReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import scheduleReducer from './scheduleReducer';
import gameReducer from './gameReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	player: playerReducer,
	team: teamReducer,
	schedule: scheduleReducer,
	game: gameReducer,
	firestore: firestoreReducer,
	firebase: firebaseReducer,
});

export default rootReducer;