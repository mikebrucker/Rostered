import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import PlayerList from '../players/PlayerList';
import { deleteTeam } from '../../store/actions/teamActions'

const TeamDetails = (props) => {
	
	const { team, teamId, players, auth } = props;
	if (!auth.uid) return <Redirect to='/signin' />

	const deleteThisTeam = () => {
		props.deleteTeam(teamId);
		props.history.push('/')
	}

	const editThisTeam = () => {
		props.history.push('/team/edit/' + teamId)
	}

	const addPlayerToThisTeam = () => {
		props.history.push('/team/addplayer/' + teamId)
	}

	if (team) {
		return (
			<section className="card center player-summary">
				<h2 className="underline">{team.teamName}</h2>
				<div>
					<div className="blue-grey stat indigo-text text-darken-4 lighten-5">{team.teamName}</div>
					<div className="blue-grey stat indigo-text text-darken-4 lighten-5">{team.league}</div>
					<div className="blue-grey stat indigo-text text-darken-4 lighten-5">{team.arena}</div>
					<PlayerList players={players} teamId={teamId} />
				</div>
				<button onClick={addPlayerToThisTeam} className="btn green accent-4">Add Player</button>
				<button onClick={editThisTeam} className="btn amber accent-4">Edit Team</button>
				<button onClick={deleteThisTeam} className="btn red accent-4">Delete Team</button>
			</section>
		)
	}
	return (
		<div className="container center">
			<p>Loading Team...</p>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	const teams = state.firestore.data.teams;
	const players = state.firestore.ordered.players;
	const team = teams ? teams[id] : null;
	return {
		players: players,
		team: team,
		teamId: id,
		auth: state.firebase.auth,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteTeam: (teamId) => dispatch(deleteTeam(teamId))
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		{ collection: 'teams' },
		{ collection: 'players' }
	])
)(TeamDetails);
