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

export const deletePlayer = (player) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		firestore.collection('players').doc(player).delete()
			.then(() => {
				dispatch({ type: 'DELETE_PLAYER', player })
			}).catch((err) => {
				dispatch({ type: 'DELETE_PLAYER_ERROR', err })
			})
	}
}

export const editPlayer = (player) => {
	return {
		
	}
}