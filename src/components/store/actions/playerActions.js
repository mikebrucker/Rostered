export const addPlayer = (player) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		// const player = getState().firebase.player;
		// const authorId = getState().firebase.auth.uid;
		firestore.collection('players').add({
			...player,
		}).then(() => {
			dispatch({ type: 'ADD_PLAYER', player })
		}).catch((err) => {
			dispatch({ type: 'ADD_PLAYER_ERROR', err })
		})
	}
};
