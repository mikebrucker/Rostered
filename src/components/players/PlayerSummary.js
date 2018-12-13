import React from 'react';
import { Link } from 'react-router-dom';

const PlayerSummary = ({player, teamId}) => {
	return (
		<Link to={'/team/' + teamId + '/player/' + player.id} key={player.id} >
			<section className="card player-summary">
				<div className="blue-grey stat indigo-text text-darken-4 lighten-5">{player.firstName + ' ' + player.lastName}</div>
				<div className="blue-grey stat indigo-text text-darken-4 lighten-5">{player.number}</div>
				<div className="blue-grey stat indigo-text text-darken-4 lighten-5">{player.position}</div>
				<div className="blue-grey stat indigo-text text-darken-4 lighten-5">{player.shoots}</div>
			</section>
		</Link>
	)
}

export default PlayerSummary;