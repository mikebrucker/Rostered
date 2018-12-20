import React from 'react';
import GameSummary from './GameSummary';

const GameList = (props) => {
	const { schedule, team } = props;
	const myGames = schedule ? schedule.games.sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time)) : null;
	const games = myGames && myGames.length > 0 ? myGames
	.map(game => {
		return (
			<GameSummary schedule={schedule} game={game} team={team} key={game.id}/>
		)
	}) : null;
	if (games) {
		return (
			<div className="game-list center section">
				{ games }
			</div>
		)
	} else {
		return (
			<div className="game-list center section">
				<div>No Games</div>
			</div>
		)
	}
}

export default GameList;