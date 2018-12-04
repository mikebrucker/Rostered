import React, { Component } from 'react';
import AddPlayer from '../players/AddPlayer';
import PlayerList from '../players/PlayerList';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

class Dashboard extends Component {
	render() {
		const { players } = this.props;
		return (
			<div className="dashboard">
				<AddPlayer />
				<PlayerList players={players} />
			</div> 
		)
	}
}

const mapStateToProps = (state) => {
	return {
		players: state.firestore.ordered.players
	};
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'players' }
	])
)(Dashboard);