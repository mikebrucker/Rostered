import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editPlayer } from '../store/actions/playerActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
// import { Redirect } from 'react-router-dom';

class EditPlayer extends Component {
	state = {
		...this.props
	}
	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}
	handleSubmit = e => {
		e.preventDefault();
		this.props.editPlayer(this.state);
		this.props.history.push('/');
	}

	render() {
		console.log(this.state)
		return (
			<div className='container add-player'>
				<form onSubmit={this.handleSubmit}>

					<div className="input-field">
						<label htmlFor='firstName'>First Name:</label>
						<input type='text' id='firstName' onChange={this.handleChange} />
					</div>

					<div className="input-field">
						<label htmlFor='lastName'>Last Name:</label>
						<input type='text' id='lastName' onChange={this.handleChange} />
					</div>

					<div className="input-field">
						<label htmlFor='number'>Number:</label>
						<input type='number' id='number' max='99' min='0' onChange={this.handleChange} />
					</div>

					<label htmlFor="position">Position</label>
					<select className="input-field browser-default" id='position' onChange={this.handleChange}>
						<option defaultValue="C">C</option>
						<option value="RW">RW</option>
						<option value="LW">LW</option>
						<option value="D">D</option>
						<option value="G">G</option>
					</select>

					<label htmlFor="shoots">Shoots</label>
					<select value='{player.shoots}' className="input-field browser-default" id='shoots' onChange={this.handleChange}>
						<option defaultValue="Right">Right</option>
						<option value="Left">Left</option>
					</select>

					<div className="input-field">
						<button>Submit</button>
					</div>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	const players = state.firestore.data.players;
	const player = players ? players[id] : null;
	// console.log(state, ownProps)
	return {
		player: player
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		editPlayer: (player) => dispatch(editPlayer(player))
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		{ collection: 'players' }
	])
)(EditPlayer);