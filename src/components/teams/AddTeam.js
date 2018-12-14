import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTeam } from '../../store/actions/teamActions';
import { Redirect } from 'react-router-dom';

class AddTeam extends Component {
	state = {
		teamOwnerId: this.props.auth.uid,
		teamId: null,
		teamName: null,
		league: null,
		arena: null,
		sport: 'Hockey',
		players: []
	}

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}
	handleSubmit = e => {
		e.preventDefault();
		this.props.addTeam(this.state);
		this.props.history.push('/');
	}

	render() {
		const { auth } = this.props;
		if (!auth.uid) return <Redirect to='/signin' />

		return (
			<div className='container add-player'>
				<form onSubmit={this.handleSubmit} className='blue-grey lighten-4'>

					<div className="input-field">
						<input placeholder='Team Name' type='text' id='teamName' onChange={this.handleChange} />
						<label htmlFor='teamName'>Team Name:</label>
					</div>

					<div className="input-field">
						<input placeholder='League' type='text' id='league' onChange={this.handleChange} />
						<label htmlFor='league'>League:</label>
					</div>

					<div className="input-field">
						<input placeholder='Arena' type='text' id='arena' onChange={this.handleChange} />
						<label htmlFor='arena'>Arena:</label>
					</div>

					<select className="input-field browser-default" id='sport' onChange={this.handleChange}>
						<option defaultValue="Hockey">Hockey</option>
					</select>
					<label className="select-label" htmlFor="sport">Sport:</label>

					<div className="input-field">
						<button className="btn green">Submit</button>
					</div>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addTeam: (team) => dispatch(addTeam(team))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTeam);