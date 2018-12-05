import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
// import { connect } from 'react-redux';

const Navbar = (props) => {
	const links = props.auth ? <SignedInLinks /> : <SignedOutLinks />;
	return (
		<nav className="center red darken-4">
			<Link to='/' className='container'>Rostered</Link>
			{ links }
		</nav>
	)
}

// const mapStateToProps = (state) => {
// 	return {
// 		// auth: state.firebase.auth,
// 		// profile: state.firebase.profile,
// 	}
// }

export default Navbar;