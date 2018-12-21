import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editGame } from '../../store/actions/gameActions';
import { Redirect } from 'react-router-dom';

class EditGame extends Component {
	state = {
		teamId: this.props.team.teamId,
		scheduleId: this.props.schedule.id,
		myTeam: this.props.team.teamName,
		opponent: this.props.game.opponent,
		time: this.props.game.time,
		date: this.props.game.date,
		id: this.props.game.id,
	}
	
	handleChange = e => {
		const target = e.target.id.split('_')[0]
		this.setState({
			[target]: e.target.value,
		})
	}
	handleSubmit = e => {
		e.preventDefault();
		if (this.state.opponent && this.state.time && this.state.date && 
			this.state.opponent.length > 0 && this.state.time.length > 0 && this.state.date.length > 0) {
			document.getElementById('edit-game' + this.state.id).style.display = 'none';
			document.getElementById('edit-game-error' + this.state.id).style.display = 'none';
			this.props.editGame(this.state);
		} else {
			document.getElementById('add-game-error').style.display = 'block';
		}
	}
	componentDidMount() {
		if (this.state.opponent) {
			localStorage.setItem('edit-game-state', JSON.stringify(this.state));
		} else {
			let localStorageState = localStorage.getItem('edit-game-state');
			localStorageState = JSON.parse(localStorageState);
			this.setState({
				...localStorageState
			})
			document.getElementById('opponent' + this.state.id).value = localStorageState.opponent;
			document.getElementById('time' + this.state.id).value = localStorageState.time;
			document.getElementById('date' + this.state.id).value = localStorageState.date;
		}
	}
	
	render() {
		const { auth } = this.props;
		if (!auth.uid) return <Redirect to='/signin' />

		if (this.state) {
			return (
				<div className='container add-game'>
					<div style={{display:'none'}} id={"add-game-error" + this.state.id} className="red-text">Input Fields Cannot Be Empty</div>
					<form onSubmit={this.handleSubmit} className='blue-grey lighten-4'>
	
						<div className="input-field">
							<input defaultValue={this.state.opponent} placeholder='Opponent' type='text' id={'opponent_' + this.state.id} onChange={this.handleChange} />
							<label className='active' htmlFor={'opponent_' + this.state.id}>Opponent:</label>
						</div>
	
						<div className="input-field">
							<input defaultValue={this.state.time} placeholder='Time' type='time' id={'time_' + this.state.id} step='300' onChange={this.handleChange} />
							<label className='active' htmlFor={'time_' + this.state.id}>Time:</label>
						</div>
	
						<div className="input-field">
							<input defaultValue={this.state.date} placeholder='date' type='date' id={'date_' + this.state.id} onChange={this.handleChange} />
							<label className='active' htmlFor={'date_' + this.state.id}>Date:</label>
						</div>
	
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
		editGame: (game) => dispatch(editGame(game))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditGame);