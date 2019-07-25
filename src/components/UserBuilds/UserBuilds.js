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

  loadUserBuilds = () => {
    buildData.getBuilds()
      .then((builds) => {
        const userId = firebase.auth().currentUser.uid;
        const userBuilds = [];
        builds.forEach((build) => {
          if (build.uid === userId) {
            userBuilds.push(build);
          }
        });
        this.setState({ builds: userBuilds });
      })
      .catch(err => console.error('error in loadBuilds/Home.js', err));
  }

  // loadBuilds = () => {
  //   const userId = firebase.auth().currentUser.uid;
  //   buildData.getUserBuilds(userId)
  //     .then(builds => this.setState({ builds }))
  //     .catch(err => console.error('error in loadBuilds/Home.js', err));
  // }

  componentDidMount() {
    this.loadUserBuilds();
  }

  deleteBuild = (buildId) => {
    const localFix = buildId.split('_local').toString();
    buildData.deleteBuild(localFix)
      .then(() => this.loadUserBuilds())
      .catch(err => console.error(err));
  }

  render() {
    const makeBuildCards = this.state.builds.map(build => (
      <BuildCard
        key={build.id}
        build={build}
        deleteBuild={this.deleteBuild}
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
