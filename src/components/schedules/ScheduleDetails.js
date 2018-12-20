import React from 'react';
import AddGame from '../games/AddGame';
import GameList from '../games/GameList';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import EditSchedule from './EditSchedule';
import { deleteSchedule } from '../../store/actions/scheduleActions';

const ScheduleDetails = (props) => {
	const { team, teamId, schedule, scheduleId } = props;

	const linkToEditSchedule = () => {
		let editschedule = document.getElementById('edit-schedule');
		let editscheduleerror = document.getElementById('edit-schedule-error');
		editschedule.style.display === 'none' ? editschedule.style.display = 'block' : editschedule.style.display = 'none'; 
		editscheduleerror.style.display = 'none';
	}
	const linkToDeleteSchedule = () => {
		let deleteschedule = document.getElementById('delete-schedule');
		deleteschedule.style.display === 'none' ? deleteschedule.style.display = 'block' : deleteschedule.style.display = 'none';
	}
	const linkToAddGame = () => {
		let addgame = document.getElementById('add-game');
		let addgameerror = document.getElementById('add-game-error');
		addgame.style.display === 'none' ? addgame.style.display = 'block' : addgame.style.display = 'none'; addgameerror.style.display = 'none';
	}
	const linkToEditGames = () => {
		let editgame = document.getElementsByClassName('edit-game');
		for (let elem of editgame) {
			elem.style.display === 'none' ? elem.style.display = 'block' : elem.style.display = 'none';
		}
	}
	const deleteThisSchedule = () => {
		props.deleteSchedule(team, scheduleId);
		props.history.push('/team/' + teamId);
	}
	if (schedule){
		return (
			<div className="team-list card grey lighten-5 center section">
				<Link to={'/team/' + team.teamId}>
					<h2>{team.teamName}</h2>
				</Link>
				<h4>Schedule</h4>
				<button className='btn amber accent-4' onClick={linkToEditSchedule}>Edit Schedule</button>
				<div style={{display:'none'}} id="edit-schedule">
					<EditSchedule team={team} schedule={schedule} />
				</div>
				<button className='btn red accent-4' onClick={linkToDeleteSchedule}>Delete Schedule</button>
				<div style={{display:'none'}} className="section red lighten-2" id="delete-schedule">
					<div>Are You Sure You Want To Delete This Schedule?</div>
					<button onClick={deleteThisSchedule} className="btn red accent-4">Permanently Delete</button>
				</div>

				<p>Current Season? { schedule.current ? 'Yes' : 'No' }</p>
				<button className='btn green accent-4' onClick={linkToAddGame}>Add Game</button>
				<button className='btn amber accent-4' onClick={linkToEditGames}>Edit Game</button>
				<div style={{display:'none'}} id="add-game">
					<AddGame team={team} schedule={schedule} />
				</div>
				<div className="container">
					<Link to={'/team/' + teamId + '/schedule/' + scheduleId}>
						<h5 className="blue-grey black-text text-darken-4 lighten-5">Season: {schedule.season}</h5>
					</Link>
					<GameList team={team} schedule={schedule} />
				</div>
			</div>
		)
	} else {
		return (
			<div className="section center">Loading...</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	const teamId = ownProps.match.params.id;
	const scheduleId = ownProps.match.params.type;
	const teams = state.firestore.data.teams;
	const team = teams ? teams[teamId] : null;
	const schedules = team ? team.schedules : null;
	const mySchedule = schedules ? schedules.filter(sched => {
		return sched.id === scheduleId;
	}) : null;
	const schedule = mySchedule ? mySchedule[0] : null;
	return {
		team: team,
		teamId: teamId,
		schedule: schedule,
		scheduleId: scheduleId,
		auth: state.firebase.auth,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteSchedule: (team, scheduleId) => dispatch(deleteSchedule(team, scheduleId))
	}
}

export default compose(
	firestoreConnect([
		{ collection: 'teams' }
	]),
	connect(mapStateToProps, mapDispatchToProps)
)(ScheduleDetails);
