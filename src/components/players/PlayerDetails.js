import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PlayerStatColumns from '../layout/PlayerStatColumns';
import { deletePlayer } from '../../store/actions/playerActions';
import { Redirect } from 'react-router-dom';
import EditPlayer from './EditPlayer';
import { Link } from 'react-router-dom';

const PlayerDetails = (props) => {
	const { team, player, playerId, auth, teamId } = props;
	if (!auth.uid) return <Redirect to='/signin' />

	const areYouSuredeleteThisPlayer = () => {
		let deleteplayer = document.getElementById('delete-player');
		deleteplayer.style.display === 'none' ? deleteplayer.style.display = 'block' : deleteplayer.style.display = 'none';
	}

	const deleteThisPlayer = () => {
		props.deletePlayer(teamId, playerId);
		props.history.push('/team/' + teamId)
	}

	const editThisPlayer = () => {
		let editplayer = document.getElementById('edit-player');
		let editplayererror = document.getElementById('edit-player-error');
		editplayer.style.display === 'none' ? editplayer.style.display = 'block' : editplayer.style.display = 'none'; editplayererror.style.display = 'none';
	}

	if (player) {
		return (
			<section className="card section center player-summary">
				<Link to={'/team/' + team.teamId}>
					<h1 className='white-text container black'>{team.teamName}</h1>
				</Link>

				<div className="container">
					<h2 className="underline">{player.firstName + ' ' + player.lastName}</h2>
					<PlayerStatColumns />
					<div>
						<div className="blue-grey stat indigo-text text-darken-4 lighten-5">{player.firstName + ' ' + player.lastName}</div>
						<div className="blue-grey stat indigo-text text-darken-4 lighten-5">{player.number}</div>
						<div className="blue-grey stat indigo-text text-darken-4 lighten-5">{player.position}</div>
						<div className="blue-grey stat indigo-text text-darken-4 lighten-5">{player.shoots}</div>
					</div>
					<div className="container">
						<button onClick={editThisPlayer} className="btn amber accent-4">Edit</button>
						<div style={{display:'none'}} id="edit-player">
							<EditPlayer team={team} player={player} />
						</div>
						<button onClick={areYouSuredeleteThisPlayer} className="btn red accent-4">Delete Player</button>
						<div style={{display:'none'}} className="section red lighten-2" id="delete-player">
						<div>Are You Sure You Want To Delete This Player?</div>
							<button onClick={deleteThisPlayer} className="btn red accent-4">Permanently Delete</button>
						</div>
					</div>
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
		auth: state.firebase.auth,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		deletePlayer: (teamId, playerId) => dispatch(deletePlayer(teamId, playerId))
	}
}

export default compose(
	firestoreConnect([
		{ collection: 'teams' }
	]),
	connect(mapStateToProps, mapDispatchToProps)
)(PlayerDetails);
