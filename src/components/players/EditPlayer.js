import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editPlayer } from '../../store/actions/playerActions';
import { Redirect } from 'react-router-dom';

class EditPlayer extends Component {
	state = {
		team: this.props.team,
		...this.props.player,
	}
	
	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value,
		})
		console.log(this.state)
	}
	handleSubmit = e => {
		e.preventDefault();
		if (this.state.firstName && this.state.lastName && this.state.number && 
			this.state.firstName.length > 0 && this.state.lastName.length > 0 && this.state.number.length > 0) {
			document.getElementById('edit-player').style.display = 'none';
			document.getElementById('edit-player-error').style.display = 'none';
			this.props.editPlayer(this.state);
		} else {
			document.getElementById('edit-player-error').style.display = 'block';
		}
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
				<div style={{display:'none'}} id="edit-player-error" className="red-text">Input Fields Cannot Be Empty</div>
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

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		editPlayer: (player) => dispatch(editPlayer(player))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPlayer);