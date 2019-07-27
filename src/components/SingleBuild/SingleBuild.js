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

class SingleBuild extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      build: {},
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

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
        <Link to={homeLink}>Go back</Link>
          <Jumbotron>
            <h1 className="display-3">{build.name}</h1>
            <p><small className="text-muted"> Created on {build.dateCreated}</small></p>
            <img src={build.imgUrl} className="jumbo-build-img" alt={altTag} />
            <p className="lead">{build.description}</p>
            <hr className="my-2" />
            <Link to={homeLink}>Go back</Link>
            <p className="lead">
            <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}Delete</Button>
            <Link className="btn btn-secondary" to={editBuildLink}>Edit</Link>
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
            <Button color="secondary" onClick={this.toggle}>Take me back!</Button>
              <Button color="danger" onClick={this.deleteThis}>I am sure!</Button>
            </ModalFooter>
          </Modal>
        </div>
        </div>
      );
    }
    return (
      <Jumbotron>
        <h1 className="display-3">{build.name}</h1>
        <p><small className="text-muted"> Created on {build.dateCreated}</small></p>
        <img src={build.imgUrl} className="jumbo-build-img" alt={altTag} />
        <p className="lead">{build.description}</p>
        <hr className="my-2" />
        <Link to={homeLink}>Go back</Link>
      </Jumbotron>
    );
  }
}

export default SingleBuild;
