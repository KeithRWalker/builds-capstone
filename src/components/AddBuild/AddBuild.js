import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  Col,
  Button,
  Form,
  div,
  Label,
  input,
} from 'reactstrap';

import buildData from '../../helpers/data/connection';

import './AddBuild.scss';

const defaultBuild = {
  name: '',
  imgUrl: '',
  dateCreated: '',
  description: '',
  isPublic: true,
  uid: '',
};

class AddBuild extends React.Component {
  state = {
    addBuild: defaultBuild,
  };

  formFieldStringState = (name, e) => {
    const tempBuild = { ...this.state.newScat };
    tempBuild[name] = e.target.value;
    this.setState({ addBuild: tempBuild });
  }

  nameValue = e => this.formFieldStringState('sampleName', e);

  imgValue = e => this.formFieldStringState('sampleImgUrl', e);

  descriptionValue = e => this.formFieldStringState('sampleDescription', e);

  formSubmit = (e) => {
    e.preventDefault();
    const userBuild = { ...this.state.addBuild };
    userBuild.uid = firebase.auth().currentUser.uid;
    buildData.AddBuild(userBuild)
      .then(() => this.props.history.push('/home'))
      .catch(err => console.error('error at formSubmit in AddBuild.js', err));
  }

  render() {
    const { addBuild } = this.state;
    return (
      <div className="AddBuild col-4">
        <h1>Add your own Build!</h1>
        <form onSubmit={this.formSubmit}>
        <div className="row">
          <Label for="formName" sm={2}>Name</Label>
          <div>
            <input
              type="text"
              name="text"
              id="formName"
              placeholder="what's your creation's name?"
              
            />
          </div>
        </div>

        <div className="row">
          <Label for="formImg" sm={2}>Image</Label>
          <div>
            <input
              type="url"
              name="url"
              id="formImg"
              placeholder="insert a url to a photo of your build!"
            />
          </div>
        </div>

        <div className="row">
          <Label for="formDescription" sm={2}>Description</Label>
          <div>
            <input
              type="textarea"
              name="text"
              id="formDescription"
              placeholder="give us a short description of what you have created!"
              />
          </div>
        </div>

        <div className="row">
          <div>
            <div check>
              <Label check>
                <input
                type="checkbox"
                id="checkbox2"
                />{' Make Private'}
              </Label>
            </div>
          </div>
        </div>

        <div check row>
          <div>
            <Button color="success" type="submit">Submit</Button>
          </div>
        </div>

        </form>
      </div>
    );
  }
}

export default AddBuild;
