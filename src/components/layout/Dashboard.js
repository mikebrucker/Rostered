import React, { Component } from 'react';
import AddPlayer from '../players/AddPlayer';
import PlayerList from '../players/PlayerList';

class Dashboard extends Component {
	render() {
		
		return (
			<div className="dashboard">
				<AddPlayer />
				<PlayerList />
			</div> 
		)
	}
}

const mapStateToProps = (state) => {
	return state;
}

export default Dashboard;