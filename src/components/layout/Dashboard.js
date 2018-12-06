import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TeamList from '../teams/TeamList';

class Dashboard extends Component {
	render() {
		const { auth, players, teams } = this.props;
		if (!auth.uid) return <Redirect to='/signin' />

		return (
			<div className="dashboard section center">
				<TeamList players={players} teams={teams} />
			</div> 
		)
	}
}

const mapStateToProps = (state) => {
	return {
		players: state.firestore.ordered.players,
		teams: state.firestore.ordered.teams,
		auth: state.firebase.auth,
	};
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'players'},
		{ collection: 'teams'},
	])
)(Dashboard);