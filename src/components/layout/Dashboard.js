import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TeamList from '../teams/TeamList';

class Dashboard extends Component {
	render() {
		const { auth, teams } = this.props;

		if (!auth.uid) return <Redirect to='/signin' />

		return (
			<section className="dashboard section center">
				<TeamList auth={auth} teams={teams} />
			</section> 
		)
	}
}

const mapStateToProps = (state) => {
	return {
		teams: state.firestore.ordered.teams,
		auth: state.firebase.auth,
	};
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'teams'},
	])
)(Dashboard);