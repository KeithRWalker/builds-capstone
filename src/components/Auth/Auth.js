import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  Jumbotron,
  Container,
} from 'reactstrap';

import FeaturedBuild from '../FeaturedBuild/FeaturedBuild';

import buildData from '../../helpers/data/buildData';

// import featuredBuildData from '../../helpers/data/featuredBuildData';

import './Auth.scss';

class Auth extends React.Component {
  state = {
    featuredBuilds: [],
  }

  loadFeaturedBuilds = () => {
    buildData.getFeaturedBuilds()
      .then(featuredBuilds => this.setState({ featuredBuilds }))
      .catch(err => console.error('error in Auth.js, loadFeaturedBuilds()', err));
  }

  componentDidMount() {
    this.loadFeaturedBuilds();
  }

  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  render() {
    const signInBtn = <button className="btn btn-success sign-in-btn" onClick={this.loginClickEvent}>Sign Up Today!</button>;
    const makeFeaturedBuilds = this.state.featuredBuilds.map(feature => (
      <FeaturedBuild
        key={feature.id}
        feature={feature}
      />
    ));

    return (
      <div className="Auth">

        <div className="banner-top">
          <Jumbotron className="jumbo" fluid>
            <Container fluid>
              <h1 className="display-1">Buildz</h1>
              <p className="lead">
                Welcome to Buildz, A place to share your lego creations!
              </p>
              <hr className="my-2" />
              <h1 className="display-4">Check out these creations!</h1>
            </Container>
            {signInBtn}
          </Jumbotron>
        </div>

        <div className="featured-con">
          {makeFeaturedBuilds}
        </div>

      </div>
    );
  }
}

export default Auth;
