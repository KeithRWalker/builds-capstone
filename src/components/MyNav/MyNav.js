import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Button,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import PropTypes from 'prop-types';

import firebase from 'firebase/app';
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
    const buildNavbar = () => {
      if (authed) {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to='/home'>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/userbuilds'>Your Builds</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/add'>Add Build</NavLink>
            </NavItem>
            <NavItem>
              <Button color="danger" onClick={this.logMeOut}>Logout</Button>
            </NavItem>
          </Nav>
        );
      }
      return <Nav className="ml-auto" navbar> <Button color='success' onClick={this.loginClickEvent}>Login</Button></Nav>;
    };

    return (
      <div className="MyNav">
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Builds</NavbarBrand>
            {buildNavbar()}
        </Navbar>
      </div>
    );
  }
}

export default MyNav;
