import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PlayerStatColumns from '../layout/PlayerStatColumns';
import { deletePlayer } from '../store/actions/playerActions';

const PlayerDetails = (props) => {
	const { player, playerId } = props;

	const deleteThisPlayer = () => {
		props.deletePlayer(playerId);
		props.history.push('/')
	}

	const editThisPlayer = () => {
		props.history.push('/player/edit/' + playerId)
	}

	if (player) {
		return (
			<section className="card center player-summary">
				<h2 className="underline">{player.firstName + ' ' + player.lastName}</h2>
				<PlayerStatColumns />
				<div>
					<div className="blue-grey stat indigo-text text-darken-4 lighten-5">{player.firstName + ' ' + player.lastName}</div>
					<div className="blue-grey stat indigo-text text-darken-4 lighten-5">{player.number}</div>
					<div className="blue-grey stat indigo-text text-darken-4 lighten-5">{player.position}</div>
					<div className="blue-grey stat indigo-text text-darken-4 lighten-5">{player.shoots}</div>
				</div>
				<button onClick={editThisPlayer} className="btn amber accent-4">Edit</button>
				<button onClick={deleteThisPlayer} className="btn red accent-4">Delete</button>
			</section>
		)
	}
	return (
		<div className="container center">
			<p>Loading Player...</p>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	const players = state.firestore.data.players;
	const player = players ? players[id] : null;
	return {
		player: player,
		playerId: id
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		deletePlayer: (player) => dispatch(deletePlayer(player))
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		{ collection: 'players' }
	])
)(PlayerDetails);
