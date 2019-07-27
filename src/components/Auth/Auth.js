import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  Jumbotron,
  Container,
} from 'reactstrap';

import FeaturedBuild from '../FeaturedBuild/FeaturedBuild';

import featuredBuildData from '../../helpers/data/featuredBuildData';

import './Auth.scss';

class Auth extends React.Component {
  state = {
    featuredBuilds: [],
  }

  loadFeaturedBuilds = () => {
    featuredBuildData.getFeaturedBuilds()
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
    const signInBtn = <button className="btn btn-secondary" onClick={this.loginClickEvent}>Sign Up Today!</button>;
    const makeFeaturedBuilds = this.state.featuredBuilds.map(feature => (
      <FeaturedBuild
        key={feature.id}
        feature={feature}
      />
    ));

    return (
      <div className="Auth">

        <div className="banner-top">
          <Jumbotron fluid>
            <Container fluid>
              <h1 className="display-1">Brick Post</h1>
              <p className="lead">Welcome to Brickpost! A place to share your lego creations!</p>
              {signInBtn}
            </Container>
          </Jumbotron>
        </div>

        <div className="featured-top">
          <Jumbotron fluid>
            <Container fluid>
              <h1 className="display-4">Check out these creations!</h1>
              <p className="lead">Made from our users!</p>
            </Container>
          </Jumbotron>
        </div>

        {makeFeaturedBuilds}

      </div>
    );
  }
}

export default Auth;
