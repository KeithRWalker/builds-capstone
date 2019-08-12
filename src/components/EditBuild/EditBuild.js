import React from 'react';
import {
  Button,
  Jumbotron,
  Container,
} from 'reactstrap';
import { Link } from 'react-router-dom';

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
    const buildId = this.props.match.params.id;
    const buildUrl = `/build/${buildId}`;

    return (
      <div className="EditBuild">

      <div className="page-header">
        <Jumbotron fluid className="jumbo">
          <Container fluid>
            <h1 className="display-3">Editing {buildState.name}</h1>
          </Container>
        </Jumbotron>
      </div>

        <div className="form-con">
          <form onSubmit={this.editFormSubmit} className="edit-form">

          <div className="row-8 edit-name">
            <label htmlFor="editFormName">Name:</label>
            <div className="col">
              <input
                type="text"
                name="text"
                className="input-area"
                id="editFormName"
                placeholder={buildState.name}
                value={buildState.editFormName}
                onChange={this.nameUpdate}
                required
              />
              </div>
          </div>

          <div className="row-8 edit-img">
            <label htmlFor="editFormImg">Image:</label>
            <div className="col">
              <input
                type="url"
                name="url"
                className="input-area"
                id="editFormImg"
                placeholder={buildState.img}
                value={buildState.editFormImg}
                onChange={this.imgUpdate}
                required
              />
              </div>
          </div>

          <div className="row-8 edit-description">
            <label htmlFor="editFormDescription">Description</label>
            <div className="col">
              <textarea
                type="text-area"
                name="text"
                className="input-area"
                id="editFormDescription"
                placeholder={buildState.description}
                value={buildState.editFormDescription}
                onChange={this.descriptionUpdate}
              />
                </div>
          </div>
          <div>
            <div>
            <Link to={buildUrl} className="btn btn-warning">Cancel</Link>
              <Button color="success" type="submit">Submit</Button>
            </div>
          </div>

          </form>
        </div>
      </div>
    );
  }
}

export default EditBuild;
