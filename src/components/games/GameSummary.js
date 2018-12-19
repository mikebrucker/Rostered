import React from 'react';
import EditGame from './EditGame';

const GameSummary = (props) => {
	const { game, team } = props;
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
	return (
		<div className="game-summary card center">
			<div className="blue-grey game-stat indigo-text text-darken-4 lighten-5">{game.myTeam + ' vs ' + game.opponent}</div>
			<div className="blue-grey game-stat indigo-text text-darken-4 lighten-5">{new Date(game.date).toDateString() + ' at ' + convertTime(gameTime)}</div>
			<div style={{display:'none'}} className="edit-game">
				<button onClick={linkToEditGame} className="btn amber">Edit</button>
				<div style={{display:'none'}} id={"edit-game" + game.id}>
					<div style={{display:'none'}} id={"edit-game-error" + game.id} className="red-text">Input Fields Cannot Be Empty</div>
					<EditGame game={game} team={team}/>
				</div>
				<button className="btn red">&times;</button>
			</div>
		</div>
	)
}

export default GameSummary;