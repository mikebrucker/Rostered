import React from 'react';
import { connect } from 'react-redux';

const SignedInLinks = (props) => {
	return (
		<ul className="right">
			<li><a>Log Out</a></li>
		</ul>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		// signOut: () => dispatch(signOut())
	}
}

export default SignedInLinks;