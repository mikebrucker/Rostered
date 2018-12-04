import React from 'react';
import PlayerSummary from './PlayerSummary';
import { Link } from 'react-router-dom';

const PlayerList = ({players}) => {
	const list = [
		{ name: 'player1', position: 'LW', id: 1 },
		{ name: 'player2', position: 'RW', id: 2 },
		{ name: 'player3', position: 'C', id: 3 }
	]
	return (
		<div className="player-list section">
			{ list && list.map(player => {
				return (
					<Link to={'/player/' + player.id} key={player.id} >
						<PlayerSummary player={player} />
					</Link>
				)
			})}
		</div>
	)
}

export default PlayerList;