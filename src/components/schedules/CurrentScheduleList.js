import React from 'react';
import { connect } from 'react-redux';
import AddGame from '../games/AddGame';
import GameList from '../games/GameList';
import { Link } from 'react-router-dom';
import EditSchedule from './EditSchedule';
import { deleteSchedule } from '../../store/actions/scheduleActions';

const CurrentScheduleList = (props) => {
	const { team } = props;
	
	const currentSchedule = team ? team.schedules.filter(schedule => {
		return schedule.current
	}) : null;
	const myCurrentSchedule = currentSchedule[0];

	const linkToAddGame = () => {
		let addgame = document.getElementById('add-game');
		let addgameerror = document.getElementById('add-game-error');
		addgame.style.display === 'none' ? addgame.style.display = 'block' : addgame.style.display = 'none'; addgameerror.style.display = 'none';
	}
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
	const deleteThisSchedule = () => {
		props.deleteSchedule(team, myCurrentSchedule.id);
	}
	const linkToEditGames = () => {
		let editgame = document.getElementsByClassName('edit-game');
		for (let elem of editgame) {
			elem.style.display === 'none' ? elem.style.display = 'block' : elem.style.display = 'none';
		}
	}
	
	return (
		<div className="team-list card grey lighten-5 center section">
			<h4>Current Schedule</h4>

			<button className='btn amber accent-4' onClick={linkToEditSchedule}>Edit Schedule</button>
			<div style={{display:'none'}} id="edit-schedule">
				<EditSchedule team={team} schedule={myCurrentSchedule} />
			</div>

			<button className='btn red accent-4' onClick={linkToDeleteSchedule}>Delete Schedule</button>
			<div style={{display:'none'}} className="section red lighten-2" id="delete-schedule">
				<div>Are You Sure You Want To Delete This Schedule?</div>
				<button onClick={deleteThisSchedule} className="btn red accent-4">Permanently Delete</button>
			</div>

			<button className='btn green accent-4' onClick={linkToAddGame}>Add Game</button>
			<div style={{display:'none'}} id="add-game">
				<div style={{display:'none'}} id="add-game-error" className="red-text">Input Fields Cannot Be Empty</div>
				<AddGame team={team} schedule={myCurrentSchedule} />
			</div>

			<button className='btn amber accent-4' onClick={linkToEditGames}>Edit Games</button>

			<div className="container">
				<Link to={'/team/' + team.teamId + '/schedule/' + myCurrentSchedule.id}>
					<h5 className="blue-grey black-text section card text-darken-4 lighten-5">Season: {myCurrentSchedule.season}</h5>
				</Link>
				<GameList team={team} schedule={myCurrentSchedule} />
			</div>

		</div>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteSchedule: (team, scheduleId) => dispatch(deleteSchedule(team, scheduleId))
	}
}

export default connect(null, mapDispatchToProps)(CurrentScheduleList);