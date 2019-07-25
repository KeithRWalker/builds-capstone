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
  }

  deleteBuild = (buildId) => {
    buildData.deleteBuild(buildId)
      .then(() => this.loadBuilds())
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
      <div className="Home">
        <div className="card-deck col-12">
          {makeBuildCards}
        </div>
      </div>
    );
  }
}

export default Home;
