import React from 'react';

import {
  Jumbotron,
  Container,
} from 'reactstrap';

import './FeaturedBuild.scss';

class FeaturedBuild extends React.Component {
  render() {
    const { feature } = this.props;
    return (
      <div className="FeaturedBuild">
        <Jumbotron fluid>
          <Container fluid>
            <h1 className="display-4">{feature.name}</h1>
            <p className="lead">{feature.dateCreated}</p>
            <img src={feature.imgUrl} alt="featured" />
            <p>{feature.description}</p>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default FeaturedBuild;
