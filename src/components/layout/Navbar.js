import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';

const Navbar = (props) => {
	const links = props ? <SignedInLinks /> : <SignedOutLinks />;
	return (
		<nav className="nav-wrapper grey darken-3">
			<Link to='/' className='logo'>Rostered</Link>
			{ links }
		</nav>
	)
}

const mapStateToProps = (state) => {
	return {
		// auth: state.firebase.auth,
		// profile: state.firebase.profile,
	}
}

export default Navbar;