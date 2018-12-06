import React from 'react';
import PlayerSummary from './PlayerSummary';
import { Link } from 'react-router-dom';
import PlayerStatColumns from '../layout/PlayerStatColumns';
import { connect } from 'react-redux';

const PlayerList = (props) => {
	const { players, teamId } = props;
	return (
		<div className="player-list container center section">
			<PlayerStatColumns />
			{ players && players.map(player => {
				if (player.teamId === teamId) {
				return (
					<Link to={'/player/' + player.id} key={player.id} >
						<PlayerSummary player={player} />
					</Link>
				)} 
			})}
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	const teamId = ownProps.teamId;
	const players = state.firestore.ordered.players;
	return {
		teamId: teamId,
		players: players,
	}
}

export default connect(mapStateToProps)(PlayerList);