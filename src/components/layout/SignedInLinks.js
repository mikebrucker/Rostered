import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { signOut } from '../../store/actions/authActions';

const SignedInLinks = (props) => {
	return (
		<ul className="right">
			<li><NavLink to='/addplayer'>Add Player</NavLink></li>
			<li><Link to='/signin' onClick={props.signOut}>Log Out</Link></li>
			<li><NavLink to='profile'>{props.profile.firstName}</NavLink></li>
		</ul>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut())
	}
}

export default connect(null, mapDispatchToProps)(SignedInLinks);