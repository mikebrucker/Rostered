import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editPlayer } from '../../store/actions/playerActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class EditPlayer extends Component {
	state = {
		...this.props.player,
		playerId: this.props.playerId
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
			localStorage.setItem('firstName', this.state.firstName);
			localStorage.setItem('lastName', this.state.lastName);
			localStorage.setItem('number', this.state.number);
			localStorage.setItem('position', this.state.position);
			localStorage.setItem('shoots', this.state.shoots);
		} else {
			let firstName = localStorage.getItem('firstName'),
			lastName = localStorage.getItem('lastName'),
			number = localStorage.getItem('number'),
			position = localStorage.getItem('position'),
			shoots = localStorage.getItem('shoots');
			this.setState({
				firstName,
				lastName,
				number,
				position,
				shoots,
				playerId: this.props.playerId
			})
			document.getElementById('position').value = position;
			document.getElementById('shoots').value = shoots;
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
	const id = ownProps.match.params.id;
	const players = state.firestore.data.players;
	const player = players ? players[id] : null;
	return {
		player: player,
		playerId: id,
		auth: state.firebase.auth
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		editPlayer: (player, playerId) => dispatch(editPlayer(player, playerId))
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		{ collection: 'players' }
	])
)(EditPlayer);