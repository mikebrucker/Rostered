export const addTeam = (team) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		// const team = getState().firebase.team;
		// const authorId = getState().firebase.auth.uid;
		firestore.collection('teams').add({
			...team,
		}).then(() => {
			dispatch({ type: 'ADD_TEAM', team })
		}).catch((err) => {
			dispatch({ type: 'ADD_TEAM_ERROR', err })
		})
	}
};
