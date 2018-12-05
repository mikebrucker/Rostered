const initState = {
	players: []
}

const playerReducer = (state = initState, action) => {
	switch (action.type) {
		case 'ADD_PLAYER':
			console.log('player added', action.player);
			return state;
		case 'ADD_PLAYER_ERROR':
			console.log('error adding player', action.err)
			return state;
		case 'DELETE_PLAYER':
			console.log('player deleted', action.player)
			return state;
		case 'DELETE_PLAYER_ERROR':
			console.log('error deleting player', action.err)
			return state;
		default:
			return state;
	}
}

export default playerReducer;