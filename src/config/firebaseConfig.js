import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
	apiKey: "AIzaSyBE5eYioEwu-v2qMOX9NYmBnKE2pqYqrvE",
	authDomain: "rostered-mwb.firebaseapp.com",
	databaseURL: "https://rostered-mwb.firebaseio.com",
	projectId: "rostered-mwb",
	storageBucket: "rostered-mwb.appspot.com",
	messagingSenderId: "641469049871"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;