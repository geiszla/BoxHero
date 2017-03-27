import { Button, ControlLabel, Form, FormControl, FormGroup, HelpBlock, Modal } from 'react-bootstrap';
import React, { Component } from 'react';

import Map from './Map.jsx';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import sendQuery from '../graphql.js';

@observer
export default class Home extends Component {
  @observable boxModalShown = false;

  workingBox;

  showBoxModal (box) {
    this.workingBox = box;
    this.boxModalShown = true;
  }

  handleBoxFound (event) {
    event.preventDefault();
    sendQuery(`
      assignBox (shortId: "${this.workingBox.shortId}") {
        username,
        noOfBoxesFound,
        noOfBoxesAdded
      }
      `, true, (data) => {
        if (data.assignBox) this.props.updateUser(data.assignBox);
        this.boxModalShown = false;
      });
  }

  render () {
    return (
      <div>
        <Map showBoxModal={(box) => this.showBoxModal(box)} boxCache={this.props.boxCache} updateBoxCache={() => this.props.updateBoxCache()} />

        <Modal className='left' show={this.boxModalShown} onHide={() => { this.boxModalShown = false; }}>
          <Modal.Header closeButton>
            <Modal.Title>{this.workingBox ? `Box description (${this.workingBox.shortId})` : 'Box description'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You think you have found the secret box placed by explorers,
              meant to be found by explorers. Now is your time to prove us that
              you have found the hiden tresure. Please enter the content of the box to the fiel below.
              Then you can receive your reward. Keep hunting other boxes to
              become the next Box Hero.
            </p>
            <br />
            <Form action='' onSubmit={(event) => { this.handleBoxFound(event); }}>
              <FormGroup>
                <ControlLabel>Did you find it?</ControlLabel>
                <input type='text' ref='boxContent' placeholder='Content' name='content' required />
              </FormGroup>
              <Button type='submit' bsStyle='success'>Found This Box!</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
