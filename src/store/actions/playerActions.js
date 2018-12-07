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

export const deletePlayer = (playerId) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		firestore.collection('players').doc(playerId).delete()
			.then(() => {
				dispatch({ type: 'DELETE_PLAYER', playerId })
			}).catch((err) => {
				dispatch({ type: 'DELETE_PLAYER_ERROR', err })
			})
	}
}

export const editPlayer = (player) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		console.log(player)
		firestore.collection('players').doc(player.playerId).set({
			firstName: player.firstName,
			lastName: player.lastName,
			number: player.number,
			position: player.position,
			shoots: player.shoots,
			teamId: player.teamId
		})
			.then(() => {
				dispatch({ type: 'EDIT_PLAYER', player })
			}).catch((err) => {
				dispatch({ type: 'EDIT_PLAYER_ERROR', err })
			})
	}
}