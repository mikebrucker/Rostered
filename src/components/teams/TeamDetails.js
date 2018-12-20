import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import PlayerList from '../players/PlayerList';
import { deleteTeam } from '../../store/actions/teamActions'
import AddPlayer from '../players/AddPlayer';
import EditTeam from './EditTeam';
import AddSchedule from '../schedules/AddSchedule';
import CurrentScheduleList from '../schedules/CurrentScheduleList';
import NotCurrentScheduleList from '../schedules/NotCurrentScheduleList';
import { Link } from 'react-router-dom';

const TeamDetails = (props) => {
	
	const { team, teamId, auth } = props;
	if (!auth.uid) return <Redirect to='/signin' />

	const areYouSureDeleteThisTeam = () => {
		let deleteteam = document.getElementById('delete-team');
		deleteteam.style.display === 'none' ? deleteteam.style.display = 'block' : deleteteam.style.display = 'none';
	}

	const deleteThisTeam = () => {
		props.deleteTeam(teamId);
		props.history.push('/')
	}

	const editThisTeam = () => {
		let editteam = document.getElementById('edit-team');
		let editteamerror = document.getElementById('edit-team-error');
		editteam.style.display === 'none' ? editteam.style.display = 'block' : editteam.style.display = 'none'; editteamerror.style.display = 'none';
	}

	const addPlayerToThisTeam = (e) => {
		let addplayer = document.getElementById('add-player');
		let addplayererror = document.getElementById('add-player-error');
		addplayer.style.display === 'none' ? addplayer.style.display = 'block' : addplayer.style.display = 'none'; addplayererror.style.display = 'none';
	}

	const addScheduleToThisTeam = (e) => {
		let addschedule = document.getElementById('add-schedule');
		let addscheduleerror = document.getElementById('add-schedule-error');
		addschedule.style.display === 'none' ? addschedule.style.display = 'block' : addschedule.style.display = 'none'; addscheduleerror.style.display = 'none';
	}
	
	if (team) {
		return (
			<section className="card section center team-details">
				<Link to={'/team/' + team.teamId}>
					<h2 className='white-text black'>{team.teamName}</h2>
				</Link>
				<div className="container section">
					<div className="card">
						<div className="blue-grey team-stat black-text text-darken-4 lighten-5">Team Name</div>
						<div className="blue-grey team-stat black-text text-darken-4 lighten-5">League</div>
						<div className="blue-grey team-stat black-text text-darken-4 lighten-5">Arena</div>
					</div>
					<div className="card">
						<div className="blue-grey team-stat indigo-text text-darken-4 lighten-5">{team.teamName}</div>
						<div className="blue-grey team-stat indigo-text text-darken-4 lighten-5">{team.league}</div>
						<div className="blue-grey team-stat indigo-text text-darken-4 lighten-5">{team.arena}</div>
					</div>
				</div>
				<div className="container">
					<button onClick={editThisTeam} className="btn amber accent-4">Edit Team</button>
					<div style={{display:'none'}} id="edit-team">
						<EditTeam team={team} />
					</div>
					<button onClick={areYouSureDeleteThisTeam} className="btn red accent-4">Delete Team</button>
					<div style={{display:'none'}} className="container section red lighten-2" id="delete-team">
						<div>Are You Sure You Want To Delete This Team?</div>
						<button onClick={deleteThisTeam} className="btn red accent-4">Permanently Delete</button>
					</div>
					<button onClick={addPlayerToThisTeam} className="btn green accent-4">Add Player</button>
					<div style={{display:'none'}} id="add-player">
						<AddPlayer team={team} />
					</div>
					<button onClick={addScheduleToThisTeam} className="btn green accent-4">Add Schedule</button>
					<div style={{display:'none'}} id="add-schedule">
						<AddSchedule team={team} />
					</div>
				</div>
				<PlayerList players={team.players} teamId={teamId} />
				<CurrentScheduleList team={team} />
				<NotCurrentScheduleList team={team} />
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
	const team = teams ? teams[id] : null;
	return {
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
	])
)(TeamDetails);
