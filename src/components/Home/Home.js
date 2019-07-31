import React from 'react';
import {
  Jumbotron,
  Container,
} from 'reactstrap';


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

        <div>
          <Jumbotron fluid>
            <Container fluid>
              <h1 className="display-3">Home</h1>
            </Container>
          </Jumbotron>
        </div>

        <div className="home-builds">
          {makeBuildCards}
        </div>
      </div>
    );
  }
}

export default Home;
