import { Button, Checkbox, ControlLabel, Form, FormGroup, Modal, Navbar } from 'react-bootstrap';
import React, { Component } from 'react';

import Logo from './Logo.jsx';
import ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import sendQuery from '../graphql.js';

@observer
export default class Signup extends Component {
  @observable status = '';
  @observable showSignup = false;
  @observable showLogin = false;

  email;
  username;

  handleSignupShow () {
    if (this.email) {
      ReactDOM.findDOMNode(this.refs.signupEmail).value = this.email;
      this.email = null;
    }

    if (this.username) {
      ReactDOM.findDOMNode(this.refs.signupUsername).value = this.username;
      this.username = null;
    }
  }

  handleLoginShow () {
    if (this.username) {
      ReactDOM.findDOMNode(this.refs.signupUsername).value = this.username;
      this.username = null;
    }
  }

  handleSignUp () {
    this.status = 'signup';

    const formData = {
      username: ReactDOM.findDOMNode(this.refs.signupUsername).value,
      email: ReactDOM.findDOMNode(this.refs.signupEmail).value,
      password: ReactDOM.findDOMNode(this.refs.signupPassword).value
    };

    sendQuery(`addUserAndLogIn(username: "${formData.username}", email: "${formData.email}", password: "${formData.password}"){username}`, true, (data) => {
      if (data.addUserAndLogIn) {
        this.props.router.push('/');
      } else {
        FB.api('/me?fields=email', (response) => {
          this.username = formData.username;
          this.showSignup = false;
          this.showLogin = true;
        });
      }
    });
  }

  handleLogin () {
    this.status = 'login';

    const formData = {
      username: ReactDOM.findDOMNode(this.refs.loginUsername).value,
      password: ReactDOM.findDOMNode(this.refs.loginPassword).value
    };

    sendQuery(`loginUserWithPassword(username: "${formData.username}", password: "${formData.password}")`, true, (data) => {
      const response = data.loginUserWithPassword;
      if (response === 'logged_in') {
        this.showLogin = false;
        this.props.router.push('/');
      } else if (response === 'not_registered') {
        this.username = formData.username;
        this.showLogin = false;
        this.showSignup = true;
      }
    });
  }

  handleFacebookLogin () {
    this.status = 'login';
    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        this.facebookLogin(response.authResponse.accessToken);
      } else {
        FB.login((response) => {
          if (response.status === 'connected') {
            return this.facebookLogin(response.authResponse.accessToken);
          } else {
            console.log('Couldn\'t login to Facebook. Try again!');
          }
        }, {scope: 'public_profile,email'});
      }
    });
  }

  facebookLogin (accessToken) {
    sendQuery(`loginUserWithToken(oauthType: 0, token: "${accessToken}")`, true, (data) => {
      if (data.loginUserWithToken === 'logged_in') {
        this.showLogin = false;
        this.props.router.push('/');
      } else {
        FB.api('/me?fields=email', (response) => {
          this.email = response.email;
          this.showLogin = false;
          this.showSignup = true;
        });
      }
    });
  }

  render () {
    return (
      <div>
        <div className='container'>
          <Navbar collapseOnSelect style={{ backgroundColor: 'white', border: 0 }}>
            <Navbar.Header>
              <Navbar.Brand>
                <Logo />
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <ul className='nav nav-pills pull-right'>
                <li><a onClick={() => { this.showSignup = true; }} style={{ cursor: 'pointer' }}>Sign up</a></li>
                <li><a onClick={() => { this.showLogin = true; }} style={{ cursor: 'pointer' }}>Log in</a></li>
              </ul>
            </Navbar.Collapse>
          </Navbar>
        </div>

        <div className='container'>
          <div className='jumbotron'>
            <h1>AN OUTDOOR GAME FOR ALL AGES</h1>
            <h3> Introducing box hero - another reason to have fun regardless of the weather</h3>
          </div>
        </div>

        <div className='container' id='firstStep'>
          <img id='exampleMap' src='images/blueMap.png' />
          <h2> How to become a box hero </h2>
          <h3> Step 1: Create a free account</h3>
          <p> Sign up with us to see boxes near you, and when you're ready <br />
              place boxes of your own </p>
        </div>

        <div className='container' id='secondStep'>
          <img id='exampleBox' src='images/box2.png' />
          <h3> Step 2: Select a box to find</h3>
          <p> Pick a box to find and use its general location to begin your search </p>
        </div>

        <div className='container' id='thirdStep'>
          <img id='exampleQBox' src='images/QBox.png' />
          <h3> Step 3: Tell us what's in the box</h3>
          <p> When you find it, simply give us its id and reap all the glory</p>
        </div>

        <div className='container' id='SignUp'>
          <h1 >What are you waiting for? </h1>
          <p><a className='btn btn-lg btn-success' href='#' role='button' data-toggle='modal' data-target='#signUp-modal'>Sign up now</a></p>
        </div>

        <div className='container' id='forms'>

          <Modal id='signUp-modal' show={this.showSignup} onShow={() => this.handleSignupShow()} onHide={() => { this.showSignup = false; }}>
            <Modal.Header closeButton>
              <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form action='' onSubmit={(event) => { event.preventDefault(); }}>
                <FormGroup>
                  <ControlLabel>Username</ControlLabel>
                  <input type='text' ref='signupUsername' placeholder='Username' name='username' required />
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Email</ControlLabel>
                  <input type='email' id='signupEmail' ref='signupEmail' placeholder='email' name='email' required />
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Password</ControlLabel>
                  <input type='password' ref='signupPassword' placeholder='Password' name='password' required />
                </FormGroup>

                <FormGroup>
                  <Checkbox>
                    {' I agree to the '}
                    <a href='#' id='termsOfUse'>Terms of Use</a>
                    {' & '}
                    <a href='#' id='privacyPolicy'>Privacy Policy</a>
                  </Checkbox>
                </FormGroup>

                <FormGroup>
                  <Button type='submit' bsStyle='success' bsSize='large' block onClick={() => this.handleSignUp()}>
                    {this.status === 'signup' ? 'Signing up...' : 'Sign up'}
                  </Button>
                </FormGroup>
              </Form>
            </Modal.Body>
          </Modal>

          <Modal id='login-modal' show={this.showLogin} onShow={() => this.handleLoginShow()} onHide={() => { this.showLogin = false; }}>
            <Modal.Header closeButton>
              <Modal.Title>Log in</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form action='' onSubmit={(event) => { event.preventDefault(); }}>
                <FormGroup >
                  <input type='text' ref='loginUsername' placeholder='Username' name='username' required />
                  <input type='password' ref='loginPassword' placeholder='Password' name='password' required />
                </FormGroup>

                <FormGroup controlId='form-help'>
                  <Checkbox style={{ display: 'inline-block' }}>Remember me</Checkbox>
                  <div id='forgotPass'><a href='#'> Forgot password?</a></div>
                </FormGroup>

                <FormGroup>
                  <Button type='submit' bsStyle='success' bsSize='large' block onClick={() => this.handleLogin()}>
                    {this.status === 'signup' ? 'Logging in...' : 'Log in'}
                  </Button>
                </FormGroup>
                <br />
                <FormGroup>
                  <ControlLabel>Or log in using a social network:</ControlLabel>
                  <Button bsStyle='primary' bsSize='large' block onClick={() => this.handleFacebookLogin()}>
                    {this.status === 'signup' ? 'Logging in...' : 'Log in with Facebook'}
                  </Button>

                  <Button bsStyle='warning' bsSize='large' block>
                    {this.status === 'signup' ? 'Logging in...' : 'Log in with Google'}
                  </Button>
                </FormGroup>
              </Form>
            </Modal.Body>
          </Modal>

        </div>
      </div>
    );
  }
}
