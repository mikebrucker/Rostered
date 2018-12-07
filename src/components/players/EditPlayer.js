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
			document.getElementById('firstName').value = this.state.firstName;
			document.getElementById('lastName').value = this.state.lastName;
			document.getElementById('number').value = this.state.number;
			document.getElementById('position').value = this.state.position;
			document.getElementById('shoots').value = this.state.shoots;
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
							<input placeholder='First Name' type='text' id='firstName' onChange={this.handleChange} />
							<label className='active' htmlFor='firstName'>First Name:</label>
						</div>
	
						<div className="input-field">
							<input placeholder='Last Name' type='text' id='lastName' onChange={this.handleChange} />
							<label className='active' htmlFor='lastName'>Last Name:</label>
						</div>
	
						<div className="input-field">
							<input placeholder='Number' type='number' id='number' max='99' min='0' onChange={this.handleChange} />
							<label className='active' htmlFor='number'>Number:</label>
						</div>
	
						<label htmlFor="position">Position</label>
						<select className=" input-field browser-default" id='position' onChange={this.handleChange}>
							<option defaultValue="C">C</option>
							<option value="RW">RW</option>
							<option value="LW">LW</option>
							<option value="D">D</option>
							<option value="G">G</option>
						</select>
	
						<label htmlFor="shoots">Shoots</label>
						<select className=" input-field browser-default" id='shoots' onChange={this.handleChange}>
							<option defaultValue="Right">Right</option>
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
			<div className="center blue-grey lighten-4">Something went wrong... Please go back...</div>
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