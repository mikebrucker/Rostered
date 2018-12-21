export const addPlayer = (props) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		const player = {
			firstName: props.firstName,
			lastName: props.lastName,
			number: props.number,
			position: props.position,
			shoots: props.shoots,
			id: props.id,
		}
		firestore.collection('teams').doc(props.teamId).get()
		.then(snapshot => {
			const team = snapshot.data();
			firestore.collection('teams').doc(props.teamId).update({
				players: [...team.players, player]
			}).then(() => {
				dispatch({ type: 'ADD_PLAYER', player: player })
			}).catch((err) => {
				dispatch({ type: 'ADD_PLAYER_ERROR', err })
			})
		})
	}
};

export const editPlayer = (props) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		const player = {
			firstName: props.firstName,
			lastName: props.lastName,
			number: props.number,
			position: props.position,
			shoots: props.shoots,
			id: props.id
		}
		firestore.collection('teams').doc(props.teamId).get()
		.then(snapshot => {
			const team = snapshot.data();
			const players = team.players.filter(plyr => {
				return plyr.id !== props.id
			});
			firestore.collection('teams').doc(props.teamId).update({
				players: [...players, player]
			}).then(() => {
				dispatch({ type: 'EDIT_PLAYER', player })
			}).catch((err) => {
				dispatch({ type: 'EDIT_PLAYER_ERROR', err })
			})
		})
	}}

export const deletePlayer = (teamId, playerId) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		firestore.collection('teams').doc(teamId).get()
		.then(snapshot => {
			const team = snapshot.data();
			const player = team.players.filter(plyr => {
				return plyr.id === playerId
			})[0];
			const players = team.players.filter(plyr => {
				return plyr.id !== playerId
			});
			firestore.collection('teams').doc(teamId).update({
				players: [...players]
			}).then(() => {
				dispatch({ type: 'DELETE_PLAYER', player: player })
			}).catch((err) => {
				dispatch({ type: 'DELETE_PLAYER_ERROR', err })
			})
		})
	}
}
