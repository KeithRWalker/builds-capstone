import React from 'react';
import PropTypes from 'prop-types';

import firebase from 'firebase/app'
import 'firebase/auth';

import './MyNav.scss';

class MyNav extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  render() {
    const { authed } = this.props;
    return (
      <div className="MyNav">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="./">Navbar</a>
          <div className="navbar-nav">
              <a className="nav-item nav-link" href="./">Features</a>
              <a className="nav-item nav-link" href="./">Pricing</a>
          </div>
          <form className="form-inline my-2 my-lg-0">
            {authed ? (
              <button className="btn btn-danger my-2 my-sm-0" onClick={this.logMeOut}>Logout</button>
            ) : (
              <button className="btn btn-secondary" onClick={this.loginClickEvent}>Login with Google</button>
            )}
          </form>
        </nav>
      </div>
    );
  }
}

export default MyNav;
