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
		players: [],
		schedules: []
	}

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}
	handleSubmit = e => {
		e.preventDefault();
		if (this.state.teamName && this.state.league && this.state.arena && 
		this.state.teamName.length > 0 && this.state.league.length > 0 && this.state.arena.length > 0) {
			document.getElementById('add-team').style.display = 'none';
			document.getElementById('add-team-error').style.display = 'none';
			this.props.addTeam(this.state);
			this.setState({
				teamOwnerId: this.props.auth.uid,
				teamId: null,
				teamName: null,
				league: null,
				arena: null,
				sport: 'Hockey',
				players: [],
				schedules: []	
			})
			document.getElementById('teamName').value = '';
			document.getElementById('league').value = '';
			document.getElementById('arena').value = '';
			document.getElementById('sport').value = 'Hockey';
		} else {
			document.getElementById('add-team-error').style.display = 'block';
		}
	}

	render() {
		const { auth } = this.props;
		if (!auth.uid) return <Redirect to='/signin' />

		return (
			<div className='container add-team'>
			<div style={{display:'none'}} id="add-team-error" className="red-text">Input Fields Cannot Be Empty</div>
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