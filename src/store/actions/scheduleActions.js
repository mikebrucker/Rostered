export const addSchedule = (props) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();		
		firestore.collection('teams').doc(props.teamId).update({
			schedules: [...props.schedules]
		}).then(() => {
			dispatch({ type: 'ADD_SCHEDULE', props })
		}).catch((err) => {
			dispatch({ type: 'ADD_SCHEDULE_ERROR', err })
		})
	}
};

export const editSchedule = (props) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		const schedules = props.schedules
		firestore.collection('teams').doc(props.teamId).update({
			schedules
		}).then(() => {
			dispatch({ type: 'EDIT_SCHEDULE', schedules })
		}).catch((err) => {
			dispatch({ type: 'EDIT_SCHEDULE_ERROR', err })
		})
	}}

export const deleteSchedule = (team, scheduleId) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		const schedules = team.schedules.filter(sched => {
			return sched.id !== scheduleId
		});
		firestore.collection('teams').doc(team.teamId).update({
			schedules,
		}).then(() => {
			dispatch({ type: 'DELETE_SCHEDULE', schedules })
		}).catch((err) => {
			dispatch({ type: 'DELETE_SCHEDULE_ERROR', err })
		})
	}
}
