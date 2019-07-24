import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import buildData from '../../helpers/data/buildData';
import BuildCard from '../BuildCard/BuildCard';


import './UserBuilds.scss';

class UserBuilds extends React.Component {
  state = {
    builds: [],
  }

  loadBuilds = () => {
    const userId = firebase.auth().currentUser.uid;
    buildData.getUserBuilds(userId)
      .then(builds => this.setState({ builds }))
      .catch(err => console.error('error in loadBuilds/Home.js', err));
  }

  componentDidMount() {
    this.loadBuilds();
  }

  render() {
    const makeBuildCards = this.state.builds.map(build => (
      <BuildCard
        key={build.id}
        build={build}
      />
    ));

    return (
      <div className="UserBuilds">
        <div className="build-card-container">
          {makeBuildCards}
        </div>
      </div>
    );
  }
}

export default UserBuilds;
