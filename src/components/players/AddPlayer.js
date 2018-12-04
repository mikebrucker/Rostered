import React, { Component } from 'react';

class AddPlayer extends Component {
	state = {
		firstName: null,
		lastName: null,
		age: null,
		position: null,
		shoots: null,
		profile: {}
	}

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}
	handleSubmit = e => {
		e.preventDefault();
		this.props.addPlayer(this.state);
	}

	render() {
		return (
			<div className='container add-player'>
				<form onSubmit={this.handleSubmit}>
					<div className="input-field">
						<label htmlFor='name'>Name:</label>
						<input type='text' id='name' onChange={this.handleChange} />
					</div>

					<div className="input-field">
						<label htmlFor='age'>Age:</label>
						<input type='text' id='age' onChange={this.handleChange} />
					</div>

					<div className="input-field">
						<label htmlFor='position'>Position:</label>
						<input type='text' id='position' onChange={this.handleChange} />
					</div>

					<div className="input-field">
						<button>Submit</button>
					</div>
				</form>
			</div>
		)
	}
}

export default AddPlayer;