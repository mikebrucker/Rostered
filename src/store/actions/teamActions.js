export const addTeam = (team) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		firestore.collection('teams').add(team).then(() => {
			dispatch({ type: 'ADD_TEAM', team })
		}).catch((err) => {
			dispatch({ type: 'ADD_TEAM_ERROR', err })
		})
	}
};

export const editTeam = (team) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		firestore.collection('teams').doc(team.teamId).update({
			teamName: team.teamName,
			league: team.league,
			arena: team.arena,
		}).then(() => {
			dispatch({ type: 'EDIT_TEAM', team })
		}).catch((err) => {
			dispatch({ type: 'EDIT_TEAM_ERROR', err })
		})
	}
}

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
