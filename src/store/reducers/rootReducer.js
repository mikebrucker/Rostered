import authReducer from './authReducer';
import playerReducer from './playerReducer';
import teamReducer from './teamReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
	auth: authReducer,
	player: playerReducer,
	team: teamReducer,
	firestore: firestoreReducer,
	firebase: firebaseReducer,
});

export default rootReducer;