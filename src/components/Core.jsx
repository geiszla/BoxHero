import { Button, Col, ControlLabel, Form, FormGroup, Modal } from 'react-bootstrap';
import React, { Component } from 'react';

import Navigation from './Navigation.jsx';
import ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import sendQuery from '../graphql.js';

@observer
export default class App extends Component {
  @observable isAddBoxShown;

  @observable boxCache = [];
  @observable rankingCache = [];

  @observable user = {};

  updateUser (user) {
    if (user) {
      this.user = user;
    } else {
      this.getUserStats();
    }
  }

  getUserStats (callback) {
    sendQuery(`
      getUserStats {
        username,
        noOfBoxesFound,
        noOfBoxesAdded
      }`, false, (data) => {
        const userStats = data.getUserStats;

        this.username = data.getUserStats.username;
        this.user = {
          username: userStats.username,
          noOfBoxesFound: userStats.noOfBoxesFound,
          noOfBoxesAdded: userStats.noOfBoxesAdded
        };
      });
  }

  updateBoxCache (boxes) {
    this.boxCache = boxes;
  }

  updateRankingCache (ranking) {
    this.rankingCache = ranking;
  }

  showAddBoxModal () {
    this.isAddBoxShown = true;
  }

  handleAddBox (event) {
    event.preventDefault();

    const formData = {
      coordinates: ReactDOM.findDOMNode(this.refs.addBoxDescription).value,
      location: {
        lattitude: ReactDOM.findDOMNode(this.refs.addBoxLattitude).value,
        longitude: ReactDOM.findDOMNode(this.refs.addBoxLongitude).value
      },
      content: ReactDOM.findDOMNode(this.refs.addBoxContent).value
    };

    sendQuery(`
      addBox ( 
        location: {
          lattitude: ${formData.location.lattitude},
          longitude: ${formData.location.longitude}
        },
        content: "${formData.content}"
       ){shortId}`, true, (data) => {
         if (data.addBox) {
           this.updateUser();
         }
       });

    this.isAddBoxShown = false;
  }

  render () {
    const childrenWithProps = React.Children.map(this.props.children, (child) => {
      const page = child.props.location.pathname;
      if (page === 'ranking' || page === '/ranking') {
        return React.cloneElement(child, {
          user: this.user,
          updateUser: () => this.updateUser(),
          rankingCache: this.rankingCache,
          updateRankingCache: (ranking) => this.updateRankingCache(ranking)
        });
      } else if (page === '/' || page === 'home' || page === '/home') {
        return React.cloneElement(child, {
          user: this.user,
          updateUser: (user) => this.updateUser(user),
          boxCache: this.boxCache,
          updateBoxCache: (boxes) => this.updateBoxCache(boxes)
        });
      } else {
        return child;
      }
    });

    return (
      <div>
        <Navigation {...this.props} user={this.user} updateUser={() => this.updateUser()} showAddBoxModal={() => this.showAddBoxModal()} />
        {childrenWithProps}

        <Modal id='placeBoxModal' show={this.isAddBoxShown} onHide={() => { this.isAddBoxShown = false; }}>
          <Modal.Header closeButton>
            <Modal.Title>Place a Box</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form action='' onSubmit={(event) => { this.handleAddBox(event); }}>
              <FormGroup>
                <ControlLabel>Box description</ControlLabel>
                <input type='text' ref='addBoxDescription' placeholder='Location' name='username' required />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Coordinates</ControlLabel>
                <input type='text' ref='addBoxLattitude' placeholder='Lattitude' name='lattitude' required />
                <input type='text' ref='addBoxLongitude' placeholder='Longitude' name='longitude' required />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Content</ControlLabel>
                <input type='text' ref='addBoxContent' placeholder='Content' name='content' required />
              </FormGroup>

              <FormGroup>
                <Button type='submit' bsStyle='success' bsSize='large' block>
                  {'Place box'}
                </Button>
              </FormGroup>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
