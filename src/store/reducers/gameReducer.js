const initState = {
	games: []
}

const gameReducer = (state = initState, action) => {
	switch (action.type) {
		case 'ADD_GAME':
			console.log('game added', action.game);
			return state;
		case 'ADD_GAME_ERROR':
			console.log('error adding game', action.err)
			return state;
		case 'DELETE_GAME':
			console.log('game deleted', action.game)
			return state;
		case 'DELETE_GAME_ERROR':
			console.log('error deleting game', action.err)
			return state;
		case 'EDIT_GAME':
			console.log('game edited', action.game)
			return state;
		case 'EDIT_GAME_ERROR':
			console.log('error deleting game', action.err)
			return state;
		default:
			return state;
	}
}

export default gameReducer;