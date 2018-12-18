import React from 'react';
import PlayerSummary from './PlayerSummary';
import PlayerStatColumns from '../layout/PlayerStatColumns';

const PlayerList = (props) => {
	const { players, teamId } = props;
	const sortPlayers = (players) => players.sort((a, b) => a.number - b.number);
	const centers = sortPlayers(players.filter(center => center.position === 'C'));
	const leftwings = sortPlayers(players.filter(leftwing => leftwing.position === 'LW'));
	const rightwings = sortPlayers(players.filter(rightwing => rightwing.position === 'RW'));
	const defensemans = sortPlayers(players.filter(defenseman => defenseman.position=== 'D'));
	const goalies = sortPlayers(players.filter(goalie => goalie.position === 'G'));
	const concatPlayers = centers.concat(leftwings).concat(rightwings).concat(defensemans).concat(goalies);
	const myPlayers = concatPlayers ? concatPlayers
	.map(player => {
		return (
			<PlayerSummary player={player} teamId={teamId} key={player.id}/>
		)
	}) : null;
	if (myPlayers) {
		return (
			<div className="player-list container center section">
				<PlayerStatColumns />
				{myPlayers}
			</div>
		)
	} else {
		return (
			<div className="player-list container center section">
				<PlayerStatColumns />
				<div>Loading...</div>
			</div>
		)
	}
}

export default PlayerList;