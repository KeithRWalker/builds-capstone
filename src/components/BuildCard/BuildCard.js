import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';

import {
  Button,
  Jumbotron,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import './BuildCard.scss';
import buildShape from '../../helpers/prop-types/buildShape';

class BuildCard extends React.Component {
  state = {
    modal: false,
    isDropOpen: false,
  }

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

  render() {
    const { build } = this.props;
    const userId = firebase.auth().currentUser.uid;
    const singleBuildUrl = `/build/${build.id}`;
    const editBuildUrl = `/edit/${build.id}`;
    if (build.uid === userId) {
      return (
        <div className="BuildCard">

          <Jumbotron fluid className="build-jumbo-card">
            <Container fluid>
            <h5 className="card-title"><Link className="single-build-link" to={singleBuildUrl}>{build.name}</Link></h5>
              <p className="lead">{build.dateCreated}</p>
              <div className="build-img">
                <img src={build.imgUrl} alt="featured" className="build-img-src" />
              </div>
              <div className="card-btns">
                <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}Delete</Button>
                <Link className="btn btn-secondary" to={editBuildUrl}>Edit</Link>
              </div>
            </Container>
          </Jumbotron>

        <div className="Modal-d">
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Delete Build?</ModalHeader>
            <ModalBody>
              Are you sure you want to delete your build?
              <br />
              This can't be undone!
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>Take me back!</Button>
              <Button color="danger" onClick={this.deleteThis}>I am sure!</Button>
            </ModalFooter>
          </Modal>
        </div>

      </div>
      );
    }
    return (
      <div className="BuildCard">
        <Jumbotron fluid className="build-jumbo-card">
          <Container fluid>
            <h5 className="card-title"><Link className="single-build-link" to={singleBuildUrl}>{build.name}</Link></h5>
              <p className="lead">{build.dateCreated}</p>
              <img src={build.imgUrl} alt="featured" className="build-img-src" />
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default BuildCard;
