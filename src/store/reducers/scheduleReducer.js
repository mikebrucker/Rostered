const initState = {
	schedules: []
}

const scheduleReducer = (state = initState, action) => {
	switch (action.type) {
		case 'ADD_SCHEDULE':
			console.log('schedule added', action.schedule);
			return state;
		case 'ADD_SCHEDULE_ERROR':
			console.log('error adding schedule', action.err)
			return state;
		case 'DELETE_SCHEDULE':
			console.log('schedule deleted', action.schedule)
			return state;
		case 'DELETE_SCHEDULE_ERROR':
			console.log('error deleting schedule', action.err)
			return state;
		case 'EDIT_SCHEDULE':
			console.log('schedule edited', action.schedule)
			return state;
		case 'EDIT_SCHEDULE_ERROR':
			console.log('error deleting schedule', action.err)
			return state;
		default:
			return state;
	}
}

export default scheduleReducer;