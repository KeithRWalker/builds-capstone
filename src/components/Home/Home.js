import React from 'react';

import BuildCard from '../BuildCard/BuildCard';

import buildData from '../../helpers/data/buildData';

import './Home.scss';

class Home extends React.Component {
  state = {
    builds: [],
  }

  loadBuilds = () => {
    buildData.getBuilds()
      .then(builds => this.setState({ builds }))
      .catch(err => console.error('error in loadBuilds/Home.js', err));
  }

  componentDidMount() {
    this.loadBuilds();
    console.error(this);
  }

  render() {
    const makeBuildCards = this.state.builds.map(build => (
      <BuildCard
        key={build.id}
        build={build}
      />
    ));

    return (
      <div className="Home">
        <div className="build-card-container">
          {makeBuildCards}
        </div>
      </div>
    );
  }
}

export default Home;
