import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  Jumbotron,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import buildData from '../../helpers/data/buildData';

import './SingleBuild.scss';

class SingleBuild extends React.Component {
    state = {
      modal: false,
      build: {},
    };

    componentDidMount() {
      const buildId = this.props.match.params.id;
      buildData.getSingleBuild(buildId)
        .then((buildPromise) => {
          const bpd = buildPromise.data;
          bpd.id = buildId;
          this.setState({ build: bpd });
        })
        .catch(err => console.error('error in SingleBuild', err));
    }

    toggle = () => {
      this.setState(prevState => ({
        modal: !prevState.modal,
      }));
    }

  deleteThis = (e) => {
    e.preventDefault();
    const buildId = this.props.match.params.id;
    buildData.deleteBuild(buildId)
      .then(() => this.props.history.push('/home'))
      .catch(err => console.error('unable to delete', err));
  }

  render() {
    const { build } = this.state;
    const userId = firebase.auth().currentUser.uid;
    const buildUid = this.state.build.uid;
    const homeLink = '/home';
    const editBuildLink = `/edit/${this.props.match.params.id}`;
    const altTag = 'Image of a build';
    if (userId === buildUid) {
      return (
        <div className="SingleBuild">
          <Jumbotron className="detail-jumbo">
            <h1 className="display-3">{build.name}</h1>
            <p><small className="text-muted"> Created on {build.dateCreated}</small></p>
            <img src={build.imgUrl} alt={altTag} />
            <p className="lead">{build.description}</p>
            <hr className="my-2" />
            <p className="lead">
            <Button color="danger" onClick={this.toggle}>Delete</Button>
            <Link className="btn btn-warning" to={editBuildLink}>Edit</Link>
            <Link to={homeLink} className="btn btn-primary">Go back</Link>
            </p>
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
                <Button color="warning" onClick={this.toggle}>Take me back!</Button>
                <Button color="danger" onClick={this.deleteThis}>I am sure!</Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
      );
    }
    return (
      <Jumbotron className="detail-jumbo">
        <h1 className="display-3">{build.name}</h1>
        <p><small className="text-muted"> Created on {build.dateCreated}</small></p>
        <img src={build.imgUrl} alt={altTag} />
        <p className="lead">{build.description}</p>
        <Link to={homeLink} className="btn btn-primary">Go back</Link>
      </Jumbotron>
    );
  }
}

export default SingleBuild;
