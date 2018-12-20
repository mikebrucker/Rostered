export const addGame = (props) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();		
		firestore.collection('teams').doc(props.teamId).update({
			schedules: [...props.schedules]
		}).then(() => {
			dispatch({ type: 'ADD_GAME', props })
		}).catch((err) => {
			dispatch({ type: 'ADD_GAME_ERROR', err })
		})
	}
};

export const editGame = (props) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		firestore.collection('teams').doc(props.teamId).update({
			schedules: [...props.schedules]
		}).then(() => {
			dispatch({ type: 'EDIT_GAME', props })
		}).catch((err) => {
			dispatch({ type: 'EDIT_GAME_ERROR', err })
		})
	}}

export const deleteGame = (team, schedule, game) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		console.log(team, schedule, game)
		const otherSchedules = team.schedules.filter(sched => {
			return sched.id !== schedule.id
		})
		const games = schedule.games.filter(gme => {
			return gme.id !== game.id
		});
		const mySchedule = {
			...schedule,
			games,
		}
		firestore.collection('teams').doc(team.teamId).update({
			schedules: [...otherSchedules, mySchedule]
		}).then(() => {
			dispatch({ type: 'DELETE_GAME', game })
		}).catch((err) => {
			dispatch({ type: 'DELETE_GAME_ERROR', err })
		})
	}
}
