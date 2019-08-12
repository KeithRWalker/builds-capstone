import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';

import {
  Container,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import userData from '../../helpers/data/userData';
import buildShape from '../../helpers/prop-types/buildShape';

import './BuildCard.scss';

class BuildCard extends React.Component {

  static propTypes = {
    build: buildShape.buildCardShape,
    deleteBuild: PropTypes.func.isRequired,
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  deleteThis = (e) => {
    e.preventDefault();
    const { build, deleteBuild } = this.props;
    deleteBuild(build.id);
  }

  assignUser = (uid) => {
    userData.getUserName(uid)
      .then(resp => resp)
      .catch(err => console.error(err));
  }

  render() {
    const { build } = this.props;
    const userId = firebase.auth().currentUser.uid;
    const singleBuildUrl = `/build/${build.id}`;
    if (build.uid === userId) {
      return (
        <div className="BuildCard">
        <Container className="build-container">
          <Link className="single-build-link" to={singleBuildUrl}><img src={build.imgUrl} alt="featured" className="build-img-src" /></Link>
          <div className="build-content">
            <h6>{build.name}</h6>
            <p>{build.dateCreated}</p>
          </div>
        </Container>
        </div>
      );
    }
    return (
      <div className="BuildCard">
      <Container className="build-container">
        <Link className="single-build-link" to={singleBuildUrl}><img src={build.imgUrl} alt="featured" className="build-img-src" /></Link>
        <div className="build-content">
          <h6>{build.name}</h6>
          <p>{build.dateCreated}</p>
        </div>
      </Container>
      </div>
    );
  }
}

export default BuildCard;
