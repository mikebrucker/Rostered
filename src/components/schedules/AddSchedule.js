import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addSchedule } from '../../store/actions/scheduleActions';
import { Redirect } from 'react-router-dom';
import generateUniqueId from 'generate-unique-id';

class AddSchedule extends Component {
	state = {
		teamId: this.props.team.teamId,
		season: null,
		current: false,
	}
	handleChange = e => {
		const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
		this.setState({
			[e.target.id]: value
		});
	}
	handleSubmit = e => {
		e.preventDefault();
		if (this.state.season && this.state.season.length > 0) {
			document.getElementById('add-schedule').style.display = 'none';
			document.getElementById('add-schedule-error').style.display = 'none';
			let uniqueKey = generateUniqueId.init({
				length: 20,
				includeSymbols: [
					'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
				]
			})
			const schedule = {
				season: this.state.season,
				current: this.state.current,
				id: uniqueKey,
				teamId: this.state.teamId
			}
			this.props.addSchedule(schedule);
			this.setState({
				teamId: this.props.team.teamId,
				season: null,
				current: false,
			})
			document.getElementById('season').value = '';
			document.getElementById('current').checked = false;
		} else {
			document.getElementById('add-schedule-error').style.display = 'block';
		}
	}

	render() {
		const { auth } = this.props;
		if (!auth.uid) return <Redirect to='/signin' />

		return (
			<div className='container add-schedule'>
				<div style={{display:'none'}} id="add-schedule-error" className="red-text">Input Fields Cannot Be Empty</div>
				<form onSubmit={this.handleSubmit} className='blue-grey lighten-4'>

					<div className="input-field">
						<input placeholder='Season Name' type='text' id='season' onChange={this.handleChange} />
						<label htmlFor='season'>Season Name</label>
					</div>

					<div>
						<label htmlFor='current'>
							<input type="checkbox" id='current' onChange={this.handleChange} />
							<span>Current Season</span>
						</label>
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
		addSchedule: (schedule) => dispatch(addSchedule(schedule))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSchedule);