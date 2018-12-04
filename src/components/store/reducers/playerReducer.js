const initState = []

const playerReducer = (state = initState, action) => {
	switch (action.type) {
		case 'ADD_PLAYER':
				console.log('player added', action.player);
				return state;
		case 'ADD_PLAYER_ERROR':
			console.log('error adding player', action.err)
			return state;
		default:
			return state;
	}
}