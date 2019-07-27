import React from 'react';
import { Button } from 'reactstrap';

import buildData from '../../helpers/data/buildData';

import './EditBuild.scss';

// this is where user input gets stored, and then is applied to buildState...
const defaultBuild = {
  name: '',
  imgUrl: '',
  dateCreated: '',
  description: '',
  isPublic: true,
  uid: '',
};

class EditBuild extends React.Component {
  // this is the state that replaces the original build, and it's info is sent to Firebase
  state = {
    buildState: defaultBuild,
  }

  componentDidMount() {
    const buildId = this.props.match.params.id;
    buildData.getSingleBuild(buildId)
      .then(buildPackage => this.setState({ buildState: buildPackage.data }))
      .catch(err => console.error('error in EditBuild, componentDidMount', err));
  }

  formState = (formName, e) => {
    const tempBuild = { ...this.state.buildState };
    tempBuild[formName] = e.target.value;
    this.setState({ buildState: tempBuild });
  }

  nameUpdate = e => this.formState('name', e);

  imgUpdate = e => this.formState('imgUrl', e);

  descriptionUpdate = e => this.formState('description', e);

  editFormSubmit = (e) => {
    e.preventDefault();
    const thisBuildState = { ...this.state.buildState };
    const buildId = this.props.match.params.id;
    const buildUrl = `/build/${buildId}`;
    buildData.updateBuild(thisBuildState, buildId)
      .then(() => this.props.history.push(`${buildUrl}`))
      .catch(err => console.error('error in EditBuild, editFormSubmit()', err));
  }

  render() {
    const { buildState } = this.state;

    return (
      <div className="EditBuild">
        <h2>Editing Build</h2>

        <form onSubmit={this.editFormSubmit}>

        <div className="row-8 edit-name">
          <label htmlFor="editFormName">Name:</label>
          <div className="col">
            <input
              type="text"
              name="text"
              id="editFormName"
              placeholder={buildState.name}
              value={buildState.editFormName}
              onChange={this.nameUpdate}
            />
            </div>
        </div>

        <div className="row-8 edit-img">
          <label htmlFor="editFormImg">Image:</label>
          <div className="col">
            <input
              type="url"
              name="url"
              id="editFormImg"
              placeholder={buildState.img}
              value={buildState.editFormImg}
              onChange={this.imgUpdate}
            />
            </div>
        </div>

        <div className="row-8 edit-description">
          <label htmlFor="editFormDescription">Description</label>
          <div className="col">
            <textarea
              type="text-area"
              name="text"
              id="editFormDescription"
              placeholder={buildState.description}
              value={buildState.editFormDescription}
              onChange={this.descriptionUpdate}
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

export default EditBuild;
