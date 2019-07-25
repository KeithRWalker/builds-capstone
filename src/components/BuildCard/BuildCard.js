import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import './BuildCard.scss';
import buildShape from '../../helpers/prop-types/buildShape';

class BuildCard extends React.Component {
  static propTypes = {
    build: buildShape.buildCardShape,
    deleteBuild: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
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
    if (build.uid === userId) {
      return (
        <div className="BuildCard">

        <div className="card text-white mb-3 no-gutters-card">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={build.imgUrl} className="card-img build-img" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{build.name}</h5>
                <p className="card-text">{build.description}</p>
                <p className="card-text"><small className="text-muted">{build.dateCreated}</small></p>
              </div>
              <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}Delete</Button>
            </div>
          </div>
        </div>

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
        <div className="card text-white mb-3 no-gutters-card">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={build.imgUrl} className="card-img build-img" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{build.name}</h5>
                <p className="card-text">{build.description}</p>
                <p className="card-text"><small className="text-muted">{build.dateCreated}</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BuildCard;
