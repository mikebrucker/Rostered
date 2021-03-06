import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

const NotCurrentScheduleList = (props) => {
	const { team } = props;
	
	const notCurrentSchedules = team ? team.schedules.filter(schedule => {
		return !schedule.current
	}) : null;
	const myNotCurrentSchedules = notCurrentSchedules ? notCurrentSchedules.map(sched => {
		return (
			<Link to={'/team/' + team.teamId + '/schedule/' + sched.id} key={sched.id}>
				<h6 className="center section black-text card">Season: {sched.season}</h6>
			</Link>
		)
	}) : null;

	if (myNotCurrentSchedules.length > 0) {
		return (
			<div className="team-list container grey lighten-5 center section">
				<h4>Other Schedules</h4>
				{ myNotCurrentSchedules }
			</div>
		)
	} else {
		return (
			<div></div>
		)
	}
}

export default withRouter((NotCurrentScheduleList));