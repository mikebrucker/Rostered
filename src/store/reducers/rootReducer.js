import authReducer from './authReducer';
import playerReducer from './playerReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
	auth: authReducer,
	player: playerReducer,
	firestore: firestoreReducer,
	firebase: firebaseReducer,
});

export default rootReducer;