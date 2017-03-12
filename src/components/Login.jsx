import { Button, Col, FormControl, FormGroup, Row } from 'react-bootstrap';
import React, { Component } from 'react';

export default class Login extends Component {
  render () {
    return (
      <div className='container'>
        <Row>
          <Col mdOffset={5} md={3}>
            <div className='form-login'>
              <h4>Welcome Back!</h4>
              <FormGroup>
                <label>
                  <FormControl bsSize='small' type='text' id='username' placeholder='Username' />
                  <FormControl bsSize='small' type='text' id='password' placeholder='Password' />
                </label>

                <div className='wrapper'>
                  <span className='group-btn'>
                    <Button type='submit' bsStyle='primary' >
                      Login
                    </Button>
                  </span>
                </div>
              </FormGroup>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
