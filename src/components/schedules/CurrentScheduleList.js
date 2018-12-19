import React from 'react';
import { withRouter } from 'react-router';
import AddGame from '../games/AddGame';
import GameList from '../games/GameList';
import { Link } from 'react-router-dom';

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
	
	return (
		<div className="team-list card grey lighten-5 center section">
			<h4>Current Schedule</h4>
			<button className='btn green accent-4' onClick={linkToAddGame}>Add Game</button>
			<div style={{display:'none'}} id="add-game">
				<div style={{display:'none'}} id="add-game-error" className="red-text">Input Fields Cannot Be Empty</div>
				<AddGame team={team} schedule={myCurrentSchedule} />
			</div>
			<div className="container">
				<Link to={'/team/' + team.teamId + '/schedule/' + myCurrentSchedule.id}>
					<h5 className="blue-grey black-text text-darken-4 lighten-5">Season: {myCurrentSchedule.season}</h5>
				</Link>
				<GameList team={team} schedule={myCurrentSchedule} />
			</div>
		</div>
	)
}

export default withRouter((CurrentScheduleList));