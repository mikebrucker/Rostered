import React from 'react';

const PlayerSummary = ({player}) => {
	return (
		<section className="card player-summary">
			<div className="blue-grey stat indigo-text text-darken-4 lighten-5">{player.firstName + ' ' + player.lastName}</div>
			<div className="blue-grey stat indigo-text text-darken-4 lighten-5">{player.number}</div>
			<div className="blue-grey stat indigo-text text-darken-4 lighten-5">{player.position}</div>
			<div className="blue-grey stat indigo-text text-darken-4 lighten-5">{player.shoots}</div>
		</section>
	)
}

export default PlayerSummary;