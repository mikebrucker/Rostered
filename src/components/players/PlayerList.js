import React from 'react';
import PlayerSummary from './PlayerSummary';
import PlayerStatColumns from '../layout/PlayerStatColumns';

const PlayerList = (props) => {
	const { players, teamId } = props;
	return (
		<div className="player-list container center section">
			<PlayerStatColumns />
			{ players && players.map(player => {
				return (
						<PlayerSummary player={player} teamId={teamId} key={player.id}/>
				)
			})}
		</div>
	)
}

export default PlayerList;