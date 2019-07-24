import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Col,
  CardHeader,
} from 'reactstrap';

import './BuildCard.scss';
// import PropTypes from 'prop-types';

class BuildCard extends React.Component {
  render() {
    const { build } = this.props;
    return (
      <div className="BuildCard col-6">
      <Col sm="4">
        <Card>
        <CardHeader>
          <CardTitle>{build.name}</CardTitle>
          <CardSubtitle>{build.dateCreated}</CardSubtitle>
        </CardHeader>
          <CardImg top width="100%" src={build.imgUrl} alt="Card image cap" />
          <CardBody>
            <CardText>{build.description}</CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
        </Col>
      </div>
    );
  }
}

export default BuildCard;
