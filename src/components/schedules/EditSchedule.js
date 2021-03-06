import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editSchedule } from '../../store/actions/scheduleActions';
import { Redirect } from 'react-router-dom';

class EditSchedule extends Component {
	state = {
		teamId: this.props.team.teamId,
		scheduleId: this.props.schedule.id,
		season: this.props.schedule.season,
		current: this.props.schedule.current,
	}
	
	handleChange = e => {
		const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
		this.setState({
			[e.target.id]: value,
		})
		console.log(this.state)
	}
	handleSubmit = e => {
		e.preventDefault();
		if (this.state.season && this.state.season.length > 0) {
			document.getElementById('edit-schedule').style.display = 'none';
			document.getElementById('edit-schedule-error').style.display = 'none';
			this.props.editSchedule(this.state);
		} else {
			document.getElementById('edit-schedule-error').style.display = 'block';
		}
	}
	componentDidMount() {
		if (this.state.season) {
			localStorage.setItem('edit-schedule-state', JSON.stringify(this.state));
		} else {
			let localStorageState = localStorage.getItem('edit-schedule-state');
			localStorageState = JSON.parse(localStorageState);
			this.setState({
				...localStorageState
			})
			document.getElementById('season').value = localStorageState.season;
			document.getElementById('current').checked = localStorageState.current;
		}
	}
	
	render() {
		const { auth } = this.props;
		if (!auth.uid) return <Redirect to='/signin' />

		if (this.state) {
			return (
				<div className='container edit-schedule'>
				<div style={{display:'none'}} id="edit-schedule-error" className="red-text">Input Fields Cannot Be Empty</div>
					<form onSubmit={this.handleSubmit} className='blue-grey lighten-4'>
	
						<div className="input-field">
							<input defaultValue={this.state.season} placeholder='Season Name' type='text' id='season' onChange={this.handleChange} />
							<label className='active' htmlFor='season'>Season Name</label>
						</div>

						<div>
							<label htmlFor='current'>
								<input defaultChecked={this.state.current} type="checkbox" id='current' onChange={this.handleChange} />
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
		editSchedule: (schedule) => dispatch(editSchedule(schedule))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSchedule);