import React from 'react';
import firebase from 'firebase/app';
import moment from 'moment';
import 'firebase/auth';
import { Button } from 'reactstrap';

import buildData from '../../helpers/data/buildData';

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
    const tempBuild = { ...this.state.addBuild };
    tempBuild[name] = e.target.value;
    this.setState({ addBuild: tempBuild });
  }

  formNameChange = e => this.formFieldStringState('name', e);

  formImgChange = e => this.formFieldStringState('imgUrl', e);

  formDescriptionChange = e => this.formFieldStringState('description', e);

  formSubmit = (e) => {
    e.preventDefault();
    const currentTime = moment().format('MMMM Do YYYY');
    const userBuild = { ...this.state.addBuild };
    userBuild.uid = firebase.auth().currentUser.uid;
    userBuild.dateCreated = currentTime;
    buildData.addBuild(userBuild)
      .then(() => this.props.history.push('/home'))
      .catch(err => console.error('error at formSubmit in AddBuild.js', err));
  }

  render() {
    const { addBuild } = this.state;
    return (
      <div className="AddBuild col-6">
        <h1>Add your own Build!</h1>
        <form onSubmit={this.formSubmit}>

        <div className="row-8">
          <label htmlFor="formName">Name:</label>
          <div className="col">
            <input
              type="text"
              name="text"
              id="formName"
              placeholder="what's your creation's name?"
              value={addBuild.formName}
              onChange={this.formNameChange}
            />
            </div>
        </div>

        <div className="row-8">
          <label htmlFor="formImg">Image:</label>
          <div className="col">
            <input
              type="url"
              name="url"
              id="formImg"
              placeholder="insert a url to a photo of your build!"
              value={addBuild.formImg}
              onChange={this.formImgChange}
            />
            </div>
        </div>

        <div className="row-8">
          <label htmlFor="formDescription">Description</label>
          <div className="col">
            <input
              type="textarea"
              name="text"
              id="formDescription"
              placeholder="give us a short description of what you have created!"
              value={addBuild.formDescription}
              onChange={this.formDescriptionChange}
              />
              </div>
        </div>
        <div>
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
