import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  Jumbotron,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';


import BuildCard from '../BuildCard/BuildCard';

import buildData from '../../helpers/data/buildData';
import userData from '../../helpers/data/userData';

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

  deleteBuild = (buildId) => {
    buildData.deleteBuild(buildId)
      .then(() => this.loadBuilds())
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.loadBuilds();
    this.setState({ newUser: false });
    const currentUid = firebase.auth().currentUser.uid;
    userData.checkIfNewUser(currentUid)
      .then((resp) => {
        if (resp === true) {
          this.setState({ newUser: true });
          console.error(resp);
        } else if (resp === false) {
          this.setState({ newUser: false });
        }
      })
      .catch(err => console.error('error', err));
  }

  sendUserData = (e) => {
    e.preventDefault();
    const userInfo = {
      displayName: e.target.userNameForm.value,
      uid: firebase.auth().currentUser.uid,
    };
    userData.postNewUser(userInfo).then(() => {
      this.setState({ newUser: false });
      this.props.history.go();
    });
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
          <Jumbotron className="jumbo" fluid>
            <Container fluid>
              <h1 className="display-3">Home</h1>
            </Container>
          </Jumbotron>
        </div>

        <div className="build-con">
          {makeBuildCards}
        </div>

        <div className="Modal-d">
          <Modal isOpen={this.state.newUser} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>New User</ModalHeader>
            <form className="user-info" onSubmit={this.sendUserData}>
            <ModalBody>
              <div className="user-name-form-con">
                <label htmlFor="userNameForm">Set Your User Name!</label>
                <div className="user-name-form">
                  <input
                    type="text"
                    name="text"
                    id="userNameForm"
                    placeholder="User Name"
                    required
                  />
                  </div>
              </div>
              </ModalBody>
              <ModalFooter>
                <Button color="success" type="submit">Submit</Button>
              </ModalFooter>
              </form>
          </Modal>
      </div>
      </div>
    );
  }
}

export default Home;
