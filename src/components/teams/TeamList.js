import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import AddTeam from './AddTeam';

const TeamList = (props) => {
	const { teams, auth } = props;
	
	const myTeams = teams && teams.length ? teams.filter(team => {
		return team.teamId && team.teamOwnerId === auth.uid;
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
		let addteam = document.getElementById('add-team');
		let addteamerror = document.getElementById('add-team-error');
		addteam.style.display === 'none' ? addteam.style.display = 'block' : addteam.style.display = 'none'; addteamerror.style.display = 'none';
	}
	
	return (
		<div className="team-list card grey lighten-5 center section">
			<h2>My Teams</h2>
			<button className='btn green accent-4' onClick={linkToCreateTeam}>Create Team</button>
			<div style={{display:'none'}} id="add-team">
				<AddTeam />
			</div>
			<div className="container">
				<div className="card">
					<div className="blue-grey team-stat black-text text-darken-4 lighten-5">Team Name</div>
					<div className="blue-grey team-stat black-text text-darken-4 lighten-5">League</div>
					<div className="blue-grey team-stat black-text text-darken-4 lighten-5">Arena</div>
				</div>
			</div>
			{ myTeamList }
		</div>
	)
}

export default withRouter((TeamList));