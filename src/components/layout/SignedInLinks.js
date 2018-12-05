import React from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SignedInLinks = (props) => {
	return (
		<ul className="right">
			<li><Link>Log Out</Link></li>
		</ul>
	)
}

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		// signOut: () => dispatch(signOut())
// 	}
// }

export default SignedInLinks;