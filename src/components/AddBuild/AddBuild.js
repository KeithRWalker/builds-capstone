import React from 'react';
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import './AddBuild.scss';

class AddBuild extends React.Component {
  render() {
    return (
      <div className="AddBuild col-4">
      <h1>Add your own Build!</h1>
        <Form>
        <FormGroup row>
          <Label for="formName" sm={2}>Name</Label>
          <Col sm={10}>
            <Input type="text" name="text" id="formName" placeholder="what's your creation's name?" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="formImg" sm={2}>Name</Label>
          <Col sm={10}>
            <Input type="url" name="url" id="formImg" placeholder="insert a url to a photo of your build!" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="formDescription" sm={2}>Description</Label>
          <Col sm={10}>
            <Input type="textarea" name="text" id="formDescription" placeholder="give us a short description of what you have created!" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={{ size: 12 }}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" id="checkbox2" />{' Make Private'}
                
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 12 }}>
            <Button>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
      </div>
    );
  }
}

export default AddBuild;
