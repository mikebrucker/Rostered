import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPlayer } from '../../store/actions/playerActions';
import { Redirect } from 'react-router-dom';

class AddPlayer extends Component {
	state = {
		firstName: null,
		lastName: null,
		number: null,
		position: 'C',
		shoots: 'Right',
		teamId: this.props.teamId,
	}

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}
	handleSubmit = e => {
		e.preventDefault();
		this.props.addPlayer(this.state);
		this.props.history.push('/team/' + this.state.teamId);
	}

	render() {
		const { auth } = this.props;
		if (!auth.uid) return <Redirect to='/signin' />

		return (
			<div className='container add-player'>
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
	const id = ownProps.match.params.id
	return {
		auth: state.firebase.auth,
		teamId: id,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addPlayer: (player) => dispatch(addPlayer(player))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayer);