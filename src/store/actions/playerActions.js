export const addPlayer = (props) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();		
		firestore.collection('teams').doc(props.teamId).update({
			players: props.players
		}).then(() => {
			dispatch({ type: 'ADD_PLAYER', player: props.players })
		}).catch((err) => {
			dispatch({ type: 'ADD_PLAYER_ERROR', err })
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
		const players = props.team.players.filter(plyr => {
			return plyr.id !== props.id
		});
		firestore.collection('teams').doc(props.team.teamId).update({
			players: [...players, player]
		}).then(() => {
			dispatch({ type: 'EDIT_PLAYER', player })
		}).catch((err) => {
			dispatch({ type: 'EDIT_PLAYER_ERROR', err })
		})
	}}

export const deletePlayer = (team, teamId, playerId) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		const players = team.players.filter(plyr => {
			return plyr.id !== playerId
		});
		firestore.collection('teams').doc(teamId).update({
			players: [...players]
		}).then(() => {
			dispatch({ type: 'DELETE_PLAYER', player: players })
		}).catch((err) => {
			dispatch({ type: 'DELETE_PLAYER_ERROR', err })
		})
	}
}
