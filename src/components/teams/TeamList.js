import React from 'react';
import { Link } from 'react-router-dom';

const TeamList = ({teams, auth}) => {
	const myTeams = teams ? teams.filter(team => {
		return team.teamOwnerId === auth.uid;
	}) : null;
	console.log(myTeams)
	if (myTeams) {
		return (
			<div className="team-list grey lighten-5 center section">
				<h2>My Teams</h2>
				{ myTeams && myTeams.map(team => {
					return (
						<section className='container' key={team.id}>
							<div className="card">
								<Link to={'/team/' + team.id} >
									<div className="blue-grey team-stat indigo-text text-darken-4 lighten-5 center">{team.teamName}</div>
									<div className="blue-grey team-stat indigo-text text-darken-4 lighten-5 center">{team.league}</div>
									<div className="blue-grey team-stat indigo-text text-darken-4 lighten-5 center">{team.arena}</div>
								</Link>
							</div>
						</section>
					)
				})}
			</div>
		)
	}
	return (
		<div className="card">No Teams Added Yet...</div>
	)
}

export default TeamList;