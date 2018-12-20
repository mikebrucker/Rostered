import React from 'react';
import EditGame from './EditGame';
import moment from 'moment';
import { deleteGame } from '../../store/actions/gameActions';
import { connect } from 'react-redux';

const GameSummary = (props) => {
	const { game, team, schedule } = props;
	const gameTime = game ? (
		game.time.split(':')
		) : null;
	const convertTime = (time) => {
		let amPm = time[0] > 11 ? ' PM' : ' AM';
		let hours = time[0] > 12 ? time[0] - 12 : time[0];
		return hours + ':' + time[1] + amPm
	}
	const linkToEditGame = () => {
		let editgame = document.getElementById('edit-game' + game.id);
		let editgameerror = document.getElementById('edit-game-error' + game.id);
		editgame.style.display === 'none' ? editgame.style.display = 'block' : editgame.style.display = 'none'; editgameerror.style.display = 'none';
	}
	const linkToDeleteGame = () => {
		let deletegame = document.getElementById('delete-game' + game.id);
		deletegame.style.display === 'none' ? deletegame.style.display = 'block' : deletegame.style.display = 'none';
	}
	const deleteThisGame = () => {
		props.deleteGame(team, schedule, game);
		let editgame = document.getElementsByClassName('edit-game');
		for (let elem of editgame) {
			elem.style.display === 'none' ? elem.style.display = 'block' : elem.style.display = 'none';
		}
	}
	return (
		<div className="game-summary card center">
			<div className="blue-grey game-stat indigo-text text-darken-4 lighten-5">{game.myTeam + ' vs ' + game.opponent}</div>
			<div className="blue-grey game-stat indigo-text text-darken-4 lighten-5">{moment(game.date).format('dddd, MMMM Do YYYY') + ' at ' + convertTime(gameTime)}</div>
			<div style={{display:'none'}} className="edit-game">
				<button onClick={linkToEditGame} className="btn amber">Edit</button>
				<div style={{display:'none'}} id={"edit-game" + game.id}>
					<div style={{display:'none'}} id={"edit-game-error" + game.id} className="red-text">Input Fields Cannot Be Empty</div>
					<EditGame schedule={schedule} game={game} team={team}/>
				</div>
				<button onClick={linkToDeleteGame} className="btn red">&times;</button>
				<div className='red lighten-3' style={{display:'none'}} id={"delete-game" + game.id}>
					<button onClick={deleteThisGame} className="btn red">Permanently Delete</button>
				</div>
			</div>
		</div>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteGame: (team, schedule, game) => dispatch(deleteGame(team, schedule, game))
	}
}

export default connect(null, mapDispatchToProps)(GameSummary);