import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editTeam } from '../../store/actions/teamActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class EditTeam extends Component {
	state = {
		...this.props.team,
		teamId: this.props.teamId
	}
	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value,
			teamId: this.props.teamId
		})
	}
	handleSubmit = e => {
		e.preventDefault();
		this.props.editTeam(this.state);
		this.props.history.push('/');
	}
	
	render() {
		const { auth } = this.props;
		if (!auth.uid) return <Redirect to='/signin' />
		if (this.state.teamId) {
			return (
				<div className='container add-player'>
					<form onSubmit={this.handleSubmit} className='blue-grey lighten-4'>
	
						<div className="input-field">
							<input defaultValue={this.state.teamName} placeholder='Team Name' type='text' id='teamName' onChange={this.handleChange} />
							<label className='active' htmlFor='teamName'>Team Name:</label>
						</div>
	
						<div className="input-field">
							<input defaultValue={this.state.league} placeholder='League' type='text' id='league' onChange={this.handleChange} />
							<label className='active' htmlFor='league'>League:</label>
						</div>
	
						<div className="input-field">
							<input defaultValue={this.state.arena} placeholder='Arena' type='text' id='arena' onChange={this.handleChange} />
							<label className='active' htmlFor='arena'>Arena:</label>
						</div>

						<div className="input-field">
							<button className='btn green'>Submit</button>
						</div>
					</form>
				</div>
			)
		}
		return (
			<div className="center blue-grey lighten-4">Something went wrong... Please go back...</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	const teams = state.firestore.data.teams;
	const team = teams ? teams[id] : null;
	return {
		team: team,
		teamId: id,
		auth: state.firebase.auth
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		editTeam: (team, teamId) => dispatch(editTeam(team, teamId))
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		{ collection: 'players' }
	])
)(EditTeam);