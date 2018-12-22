import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addGame } from '../../store/actions/gameActions';
import { Redirect } from 'react-router-dom';

class AddGame extends Component {
	state = {
		teamId: this.props.team.teamId,
		scheduleId: this.props.schedule.id,
		myTeam: this.props.team.teamName,
		opponent: null,
		time: null,
		date: null
	}
	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		})
		console.log(this.state)
	}
	handleSubmit = e => {
		e.preventDefault();
		if (this.state.opponent && this.state.time && this.state.date && 
		this.state.opponent.length > 0 && this.state.time.length > 0 && this.state.date.length > 0) {
			document.getElementById('add-game').style.display = 'none';
			document.getElementById('add-game-error').style.display = 'none';
			const game = {
				myTeam: this.state.myTeam,
				opponent: this.state.opponent,
				time: this.state.time,
				date: this.state.date,
				teamId: this.state.teamId,
				scheduleId: this.state.scheduleId,		
			}
			this.props.addGame(game);
			this.setState({
				teamId: this.props.team.teamId,
				scheduleId: this.props.schedule.id,
				myTeam: this.props.team.teamName,
				opponent: null,
				time: null,
				date: null
			})
			document.getElementById('opponent').value = '';
			document.getElementById('time').value = '';
			document.getElementById('date').value = '';
		} else {
			document.getElementById('add-game-error').style.display = 'block';
		}
	}

	render() {
		const { auth } = this.props;
		if (!auth.uid) return <Redirect to='/signin' />

		return (
			<div className='container add-game'>
				<div style={{display:'none'}} id="add-game-error" className="red-text">Input Fields Cannot Be Empty</div>
				<form onSubmit={this.handleSubmit} className='blue-grey lighten-4'>

					<div className="input-field">
						<input placeholder='Opponent' type='text' id='opponent' onChange={this.handleChange} />
						<label htmlFor='opponent'>Opponent:</label>
					</div>

					<div className="input-field">
						<input placeholder='Time' type='time' id='time' step='300' onChange={this.handleChange} />
						<label htmlFor='time'>Time:</label>
					</div>

					<div className="input-field">
						<input placeholder='date' type='date' id='date' onChange={this.handleChange} />
						<label htmlFor='date'>Date:</label>
					</div>

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
		addGame: (game) => dispatch(addGame(game))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGame);