import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PlayerStatColumns from '../layout/PlayerStatColumns';
import { deletePlayer } from '../../store/actions/playerActions';
import { Redirect } from 'react-router-dom';

const PlayerDetails = (props) => {
	// console.log(props)
	const { team, player, playerId, auth, teamId } = props;
	if (!auth.uid) return <Redirect to='/signin' />

	const deleteThisPlayer = () => {
		props.deletePlayer(team, teamId, playerId);
		props.history.push('/team/' + teamId)
	}

	const editThisPlayer = () => {
		props.history.push('/team/' + teamId + '/editplayer/' + player.id)
	}

	if (player) {
		return (
			<section className="card center player-summary">
				<div className="container">
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
	const teamId = ownProps.match.params.id;
	const playerId = ownProps.match.params.type;
	const teams = state.firestore.data.teams;
	const team = teams ? teams[teamId] : null;
	const players = team ? team.players : null;
	const myPlayer = players ? players.filter(plyr => {
		return plyr.id === playerId;
	}) : null;
	const player = myPlayer ? myPlayer[0] : null;
	return {
		team: team,
		teamId: teamId,
		player: player,
		playerId: playerId,
		teamId: teamId,
		auth: state.firebase.auth,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		deletePlayer: (team, teamId, playerId) => dispatch(deletePlayer(team, teamId, playerId))
	}
}

export default compose(
	firestoreConnect([
		{ collection: 'teams' }
	]),
	connect(mapStateToProps, mapDispatchToProps)
)(PlayerDetails);
