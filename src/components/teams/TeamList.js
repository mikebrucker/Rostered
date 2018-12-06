import React from 'react';
import { Link } from 'react-router-dom';

const TeamList = ({teams}) => {
	return (
		<div className="team-list grey lighten-5 center card section">
			<h2>My Teams</h2>
			{ teams && teams.map(team => {
				return (
					<div className='card blue-grey lighten-5' key={team.id}>
						<Link to={'/team/' + team.id} >
							<div className="blue-grey stat indigo-text text-darken-4 lighten-5 center">{team.teamName}</div>
							<div className="blue-grey stat indigo-text text-darken-4 lighten-5 center">{team.league}</div>
							<div className="blue-grey stat indigo-text text-darken-4 lighten-5 center">{team.arena}</div>
						</Link>
					</div>
				)
			})}
		</div>
	)
}

export default TeamList;