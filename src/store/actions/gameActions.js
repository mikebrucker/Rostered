export const addGame = (props) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		const game = {
			myTeam: props.myTeam,
			opponent: props.opponent,
			time: props.time,
			date: props.date,
			id: props.id
		}
		firestore.collection('teams').doc(props.teamId).get()
		.then(snapshot => {
			const team = snapshot.data();
			const otherSchedules = team.schedules.filter(sched => {
				return sched.id !== props.scheduleId
			});
			const mySchedule = team.schedules.filter(sched => {
				return sched.id === props.scheduleId
			})[0];
			const games = [...mySchedule.games, game]
			const schedule = {
				...mySchedule,
				games
			}
			firestore.collection('teams').doc(props.teamId).update({
				schedules: [...otherSchedules, schedule]
			}).then(() => {
				dispatch({ type: 'ADD_GAME', game })
			}).catch((err) => {
				dispatch({ type: 'ADD_GAME_ERROR', err })
			})
		})
	}
};

export const editGame = (props) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		const game = {	
			myTeam: props.myTeam,
			opponent: props.opponent,
			time: props.time,
			date: props.date,
			id: props.id,
		}
		firestore.collection('teams').doc(props.teamId).get()
		.then(snapshot => {
			const team = snapshot.data();
			const otherSchedules = team.schedules.filter(sched => {
				return sched.id !== props.scheduleId
			});
			const mySchedule = team.schedules.filter(sched => {
				return sched.id === props.scheduleId
			})[0];
			const otherGames = mySchedule.games.filter(gme => {
				return gme.id !== props.id
			});
			const schedule = {
				...mySchedule,
				games: [...otherGames, game]
			}
			console.log(schedule)
			firestore.collection('teams').doc(props.teamId).update({
				schedules: [...otherSchedules, schedule]
			}).then(() => {
				dispatch({ type: 'EDIT_GAME', game })
			}).catch((err) => {
				dispatch({ type: 'EDIT_GAME_ERROR', err })
			})
		})
	}}

export const deleteGame = (teamId, scheduleId, gameId) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		firestore.collection('teams').doc(teamId).get()
		.then(snapshot => {
			const team = snapshot.data();
			const otherSchedules = team.schedules.filter(sched => {
				return sched.id !== scheduleId
			});
			const mySchedule = team.schedules.filter(sched => {
				return sched.id === scheduleId
			})[0];
			const game = mySchedule.games.filter(game => {
				return game.id === gameId
			})[0];
			const games = mySchedule.games.filter(game => {
				return game.id !== gameId
			});
			const schedule = {
				...mySchedule,
				games
			}
			firestore.collection('teams').doc(teamId).update({
				schedules: [...otherSchedules, schedule]
			}).then(() => {
				dispatch({ type: 'DELETE_GAME', game })
			}).catch((err) => {
				dispatch({ type: 'DELETE_GAME_ERROR', err })
			})
		})
	}
}
