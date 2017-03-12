import React, { Component } from 'react';

import sendQuery from '../graphql.js';

export default class Home extends Component {
  constructor () {
    super();
    this.state = {
      status: ''
    };
    this.email = '';
  }

  componentDidMount () {
    gapi.signin2.render('g-signin2', {
      'onsuccess': this.handleGoogleLogin
    });
  }

  handleGoogleLogin (googleUser) {
    const email = googleUser.getBasicProfile().getEmail();

    sendQuery(`loginUser(email: "${email}", password: "")`, true, (data) => {
      if (data.loginUser === 'not_registered') {
        console.log('Not registered');
        this.email = email;
      } else {
        console.log('Registered');
      }
    });
  }

  handleFacebookLogin () {
    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        this.facebookLogin();
      } else {
        FB.login((response) => {
          if (response.status === 'connected') {
            this.facebookLogin();
          } else {
            console.log('Couldn\'t login to Facebook. Try again!');
          }
        }, {scope: 'public_profile,email'});
      }
    });
  }

  facebookLogin () {
    FB.api('/me?fields=email', (response) => {
      sendQuery(`loginUser(email: "${response.email}", password: "")`, true, (data) => {
        if (data.loginUser === 'not_registered') {
          this.setState({ status: 'not_registered' });
          this.email = response.email;
        } else {
          this.setState({ status: 'logged_in' });
        }
      });
    });
  }

  handleRegister () {
    sendQuery(`
      addUser(
        username: "geiszla",
        email: "${this.email}",
        name: {
          first: "András",
          last: "Geiszl"
        }) { email }`, true, (data) => {
          if (data.addUser !== null) {
            this.setState({ status: 'not_registered' });
          } else {
            this.setState({ status: 'logged_in' });
          }
        });
  }

  render () {
    let buttonText;
    let fbOnclick;
    switch (this.state.status) {
      case 'not_registered':
        buttonText = 'Register';
        fbOnclick = () => this.handleRegister();
        break;

      case 'logged_in':
        buttonText = 'Logged In';
        fbOnclick = () => { alert(`User is already logged in.`); };
        break;

      default:
        buttonText = 'Login';
        fbOnclick = () => this.handleFacebookLogin();
        break;
    }

    return (
      <div className='container'>
        {'Facebook: '}
        <a onClick={fbOnclick}>{buttonText}</a>
        <br />
        <br />
        {'Google: '}
        <div id='g-signin2' />
      </div>
    );
  }
}
