export const addSchedule = (props) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		const schedule = {
			season: props.season,
			current: props.current,
			games: [],
			id: props.id,
		}
		firestore.collection('teams').doc(props.teamId).get()
		.then(snapshot => {
			const team = snapshot.data();
			const schedules = schedule.current ? team.schedules.map(sched => {
				return {...sched, current: false}
			}) : team.schedules
			firestore.collection('teams').doc(props.teamId).update({
				schedules: [...schedules, schedule]
			}).then(() => {
				dispatch({ type: 'ADD_SCHEDULE', schedule })
			}).catch((err) => {
				dispatch({ type: 'ADD_SCHEDULE_ERROR', err })
			})
		})
	}
};

export const editSchedule = (props) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		firestore.collection('teams').doc(props.teamId).get()
		.then(snapshot => {
			const team = snapshot.data();
			const mySchedule = team.schedules.filter(sched => {
				return sched.id === props.scheduleId
			})[0];
			const otherSchedules = team.schedules.filter(sched => {
				return sched.id !== props.scheduleId
			});
			const schedule = {
				...mySchedule,
				season: props.season,
				current: props.current
			}
			const schedules = props.current ? otherSchedules.map(sched => {
				return {...sched, current: false}
			}) : otherSchedules;
			firestore.collection('teams').doc(props.teamId).update({
				schedules: [...schedules, schedule]
			}).then(() => {
				dispatch({ type: 'EDIT_SCHEDULE', schedule })
			}).catch((err) => {
				dispatch({ type: 'EDIT_SCHEDULE_ERROR', err })
			})
		})
	}}

export const deleteSchedule = (teamId, scheduleId) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		firestore.collection('teams').doc(teamId).get()
		.then(snapshot => {
			const team = snapshot.data()
			const schedule = team.schedules.filter(sched => {
				return sched.id === scheduleId
			})[0];
			const schedules = team.schedules.filter(sched => {
				return sched.id !== scheduleId
			});
			firestore.collection('teams').doc(teamId).update({
				schedules
			}).then(() => {
				dispatch({ type: 'DELETE_SCHEDULE', schedule })
			}).catch((err) => {
				dispatch({ type: 'DELETE_SCHEDULE_ERROR', err })
			})
		})
	}
}
