import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editPlayer } from '../../store/actions/playerActions';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class EditPlayer extends Component {
	state = {
		team: this.props.team,
		teamId: this.props.teamId,
		...this.props.player,
	}
	
	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value,
		})
	}
	handleSubmit = e => {
		e.preventDefault();
		this.props.editPlayer(this.state);
		this.props.history.push('/team/' + this.state.teamId);
	}
	componentDidMount() {
		if (this.state.firstName) {
			localStorage.setItem('state', JSON.stringify(this.state));
		} else {
			let localStorageState = localStorage.getItem('state');
			localStorageState = JSON.parse(localStorageState);
			this.setState({
				...localStorageState
			})
			document.getElementById('position').value = localStorageState.position;
			document.getElementById('shoots').value = localStorageState.shoots;
		}
	}
	
	render() {
		const { auth } = this.props;
		if (!auth.uid) return <Redirect to='/signin' />

		if (this.state) {
			return (
				<div className='container add-player'>
					<form onSubmit={this.handleSubmit} className='blue-grey lighten-4'>
	
						<div className="input-field">
							<input defaultValue={this.state.firstName} placeholder='First Name' type='text' id='firstName' onChange={this.handleChange} />
							<label className='active' htmlFor='firstName'>First Name:</label>
						</div>
	
						<div className="input-field">
							<input defaultValue={this.state.lastName} placeholder='Last Name' type='text' id='lastName' onChange={this.handleChange} />
							<label className='active' htmlFor='lastName'>Last Name:</label>
						</div>
	
						<div className="input-field">
							<input defaultValue={this.state.number} placeholder='Number' type='number' id='number' max='99' min='0' onChange={this.handleChange} />
							<label className='active' htmlFor='number'>Number:</label>
						</div>
	
						<label htmlFor="position">Position</label>
						<select defaultValue={this.state.position} className=" input-field browser-default" id='position' onChange={this.handleChange}>
							<option value="C">C</option>
							<option value="RW">RW</option>
							<option value="LW">LW</option>
							<option value="D">D</option>
							<option value="G">G</option>
						</select>
	
						<label htmlFor="shoots">Shoots</label>
						<select defaultValue={this.state.shoots} className=" input-field browser-default" id='shoots' onChange={this.handleChange}>
							<option value="Right">Right</option>
							<option value="Left">Left</option>
						</select>
	
						<div className="input-field">
							<button className="btn green">Submit</button>
						</div>
					</form>
				</div>
			)
		}
		return (
			<div className="center blue-grey lighten-4">Loading...</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	const teamId = ownProps.match.params.id;
	const playerId = ownProps.match.params.type;
	const teams = state.firestore.data.teams;
	const team = teams ? teams[teamId] : null;
	const players = team ? team.players : null;
	const myPlayer = players ? players.filter(plyr => {
		return plyr.id === playerId;
	}) : null;
	const player = myPlayer ? myPlayer[0] : null;
	return {
		auth: state.firebase.auth,
		teamId: teamId,
		team: team,
		player: player,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		editPlayer: (player) => dispatch(editPlayer(player))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPlayer);