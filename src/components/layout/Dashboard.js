import React, { Component } from 'react';
import PlayerList from '../players/PlayerList';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
	render() {
		const { auth } = this.props;
		if (!auth.uid) return <Redirect to='/signin' />

		const { players } = this.props;
		return (
			<div className="dashboard">
				<PlayerList players={players} />
			</div> 
		)
	}
}

const mapStateToProps = (state) => {
	return {
		players: state.firestore.ordered.players,
		auth: state.firebase.auth,
	};
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'players' }
	])
)(Dashboard);