import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Button,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import PropTypes from 'prop-types';

import firebase from 'firebase/app';
import 'firebase/auth';

import './MyNav.scss';

class MyNav extends React.Component {
  state = {
    dropdownOpen: false,
  }

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

  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  render() {
    const { authed } = this.props;
    const { userName } = this.props;
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
            <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle} direction="down">
            <DropdownToggle nav caret>
              {userName}
            </DropdownToggle>
            <DropdownMenu className="dd-con btn">
              <DropdownItem className="dd-item" onClick={this.logMeOut}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          </Nav>
        );
      }
      return <Nav className="ml-auto" navbar> <Button className="btn btn-success sign-in-btn" onClick={this.loginClickEvent}>Login</Button></Nav>;
    };

    return (
      <div className="MyNav">
        <Navbar dark expand="md" className="my-nav">
          <NavbarBrand href="/">Buildz</NavbarBrand>
            {buildNavbar()}
        </Navbar>
      </div>
    );
  }
}

export default MyNav;
