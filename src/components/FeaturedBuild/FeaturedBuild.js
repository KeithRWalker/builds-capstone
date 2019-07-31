import React from 'react';

import {
  Container,
} from 'reactstrap';

import './FeaturedBuild.scss';

class FeaturedBuild extends React.Component {
  render() {
    const { feature } = this.props;
    return (
      <div className="FeaturedBuild">
        <Container className="featured-container">
        <img src={feature.imgUrl} alt="featured" className="featured-img-src" />
        <div className="featured-content">
          <h6>{feature.name}</h6>
          <p>{feature.dateCreated}</p>
        </div>
      </Container>
      </div>
    );
  }
}

export default FeaturedBuild;

// <Jumbotron fluid>
// <Container fluid>
//   <h1 className="display-4">{feature.name}</h1>
//   <p className="lead">{feature.dateCreated}</p>
//   <img src={feature.imgUrl} alt="featured" className="build-img"/>
// </Container>
// </Jumbotron>
