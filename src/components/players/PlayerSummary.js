import React from 'react';

const PlayerSummary = ({player}) => {
	return (
		<section className="card player-summary">
			<div className="card-content white-text">
				<div className="inline-block stat">
					<div className="red">Name:</div>
					<div className="black yellow-text">{player.name}</div>
				</div>
				<div className="inline-block stat">
					<div className="red">Position:</div>
					<div className="black blue-text lighten-2">{player.position}</div>
				</div>
				<div className="inline-block stat">
					<div className="red">Points:</div>
					<div className="black blue-text lighten-2">{Math.round(Math.random()*40)}</div>
				</div>
			</div>
		</section>
	)
}

export default PlayerSummary;