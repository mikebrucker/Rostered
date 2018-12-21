import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editTeam } from '../../store/actions/teamActions';
import { Redirect } from 'react-router-dom';

class EditTeam extends Component {
	state = {
		...this.props.team,
	}
	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value,
		})
	}
	handleSubmit = e => {
		e.preventDefault();
		if (this.state.teamName && this.state.league && this.state.arena && 
			this.state.teamName.length > 0 && this.state.league.length > 0 && this.state.arena.length > 0) {
			document.getElementById('edit-team').style.display = 'none';
			document.getElementById('edit-team-error').style.display = 'none';
	
			this.props.editTeam(this.state);
		} else {
			document.getElementById('edit-team-error').style.display = 'block';
		}
	}
	componentDidMount() {
		if (this.state) {
			localStorage.setItem('edit-team-state', JSON.stringify(this.state));
		} else {
			let localStorageState = localStorage.getItem('edit-team-state');
			localStorageState = JSON.parse(localStorageState);
			this.setState({
				...localStorageState
			})
		}
	}
	
	render() {
		const { auth } = this.props;
		if (!auth.uid) return <Redirect to='/signin' />
		if (this.state.arena) {
			return (
				<div className='container edit-team'>
					<div style={{display:'none'}} id="edit-team-error" className="red-text">Input Fields Cannot Be Empty</div>
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

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		editTeam: (team) => dispatch(editTeam(team))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTeam);