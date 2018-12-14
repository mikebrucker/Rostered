import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

const TeamList = (props) => {
	const { teams, auth } = props;
	
	const myTeams = teams && teams.length ? teams.filter(team => {
		return team.teamOwnerId === auth.uid;
	}) : null;

	const myTeamList = myTeams && myTeams.length > 0 ? (
		myTeams.map(team => {
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
		})
	) : (
		<div className="container">
			<div className="card">No Teams Added Yet...</div>
		</div>
	)

	const linkToCreateTeam = () => {
		props.history.push('/addteam')
	}
	
	return (
		<div className="team-list grey lighten-5 center section">
			<h2>My Teams</h2>
			<button className='btn green accent-4' onClick={linkToCreateTeam}>Create Team</button>
			{ myTeamList }
		</div>
	)
}

export default withRouter((TeamList));