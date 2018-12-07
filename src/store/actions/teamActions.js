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

export const deleteTeam = (teamId) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		firestore.collection('teams').doc(teamId).delete()
			.then(() => {
				dispatch({ type: 'DELETE_TEAM', teamId })
			}).catch((err) => {
				dispatch({ type: 'DELETE_TEAM_ERROR', err })
			})
	}
}

export const editTeam = (team) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		console.log(team)
		firestore.collection('teams').doc(team.teamId).set({
			teamName: team.teamName,
			league: team.league,
			arena: team.arena,
			teamOwnerId: team.teamOwnerId
		})
			.then(() => {
				dispatch({ type: 'EDIT_TEAM', team })
			}).catch((err) => {
				dispatch({ type: 'EDIT_TEAM_ERROR', err })
			})
	}
}