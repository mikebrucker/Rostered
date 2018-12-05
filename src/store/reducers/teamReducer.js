const initState = {
	teams: []
}

const teamReducer = (state = initState, action) => {
	switch (action.type) {
		case 'ADD_TEAM':
			console.log('team added', action.team);
			return state;
		case 'ADD_TEAM_ERROR':
			console.log('error adding team', action.err)
			return state;
		case 'DELETE_TEAM':
			console.log('team deleted', action.team)
			return state;
		case 'DELETE_TEAM_ERROR':
			console.log('error deleting team', action.err)
			return state;
		case 'EDIT_TEAM':
			console.log('team edited', action.team)
			return state;
		case 'EDIT_TEAM_ERROR':
			console.log('error deleting team', action.err)
			return state;
		default:
			return state;
	}
}

export default teamReducer;