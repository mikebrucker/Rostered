import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPlayer } from '../../store/actions/playerActions';
import { Redirect } from 'react-router-dom';
import generateUniqueId from 'generate-unique-id';

class AddPlayer extends Component {
	state = {
		teamId: this.props.team.teamId,
		firstName: null,
		lastName: null,
		number: null,
		position: 'C',
		shoots: 'Right',
	}
	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}
	handleSubmit = e => {
		e.preventDefault();
		if (this.state.firstName && this.state.lastName && this.state.number && 
		this.state.firstName.length > 0 && this.state.lastName.length > 0 && this.state.number.length > 0) {
			document.getElementById('add-player').style.display = 'none';
			document.getElementById('add-player-error').style.display = 'none';
			let uniqueKey = generateUniqueId.init({
				length: 20,
				includeSymbols: [
					'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
				]
			})
			const player = {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				number: this.state.number,
				position: this.state.position,
				shoots: this.state.shoots,
				id: uniqueKey,
				teamId: this.state.teamId,
			}
			this.props.addPlayer(player);
			this.setState({
				teamId: this.props.team.teamId,
				firstName: null,
				lastName: null,
				number: null,
				position: 'C',
				shoots: 'Right',	
			})
			document.getElementById('firstName').value = '';
			document.getElementById('lastName').value = '';
			document.getElementById('number').value = '';
			document.getElementById('position').value = 'C';
			document.getElementById('shoots').value = 'Right';
		} else {
			document.getElementById('add-player-error').style.display = 'block';
		}
	}

	render() {
		const { auth } = this.props;
		if (!auth.uid) return <Redirect to='/signin' />

		return (
			<div className='container add-player'>
				<div style={{display:'none'}} id="add-player-error" className="red-text">Input Fields Cannot Be Empty</div>
				<form onSubmit={this.handleSubmit} className='blue-grey lighten-4'>

					<div className="input-field">
						<input placeholder='First Name' type='text' id='firstName' onChange={this.handleChange} />
						<label htmlFor='firstName'>First Name:</label>
					</div>

					<div className="input-field">
						<input placeholder='Last Name' type='text' id='lastName' onChange={this.handleChange} />
						<label htmlFor='lastName'>Last Name:</label>
					</div>

					<div className="input-field">
						<input placeholder='Number' type='number' id='number' max='99' min='0' onChange={this.handleChange} />
						<label htmlFor='number'>Number:</label>
					</div>

					<select className="input-field browser-default" id='position' onChange={this.handleChange}>
						<option defaultValue="C">C</option>
						<option value="RW">RW</option>
						<option value="LW">LW</option>
						<option value="D">D</option>
						<option value="G">G</option>
					</select>
					<label className="select-label" htmlFor="position">Position</label>

					<select className="input-field browser-default" id='shoots' onChange={this.handleChange}>
						<option defaultValue="Right">Right</option>
						<option value="Left">Left</option>
					</select>
					<label className="select-label" htmlFor="shoots">Shoots</label>

					<div className="input-field">
						<button className="btn green">Submit</button>
					</div>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		auth: state.firebase.auth,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addPlayer: (player) => dispatch(addPlayer(player))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayer);