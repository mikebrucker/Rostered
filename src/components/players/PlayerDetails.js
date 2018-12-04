import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PlayerStatColumns from '../layout/PlayerStatColumns';

const PlayerDetails = (props) => {
	const { player } = props;

	if (player) {
		return (
			<section className="card center player-summary">
				<PlayerStatColumns />
				<div>
					<div className="blue-grey stat indigo-text text-darken-4 lighten-5">{player.firstName + ' ' + player.lastName}</div>
					<div className="blue-grey stat indigo-text text-darken-4 lighten-5">{player.number}</div>
					<div className="blue-grey stat indigo-text text-darken-4 lighten-5">{player.position}</div>
					<div className="blue-grey stat indigo-text text-darken-4 lighten-5">{player.shoots}</div>
				</div>
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
		player: player
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'players' }
	])
)(PlayerDetails);
