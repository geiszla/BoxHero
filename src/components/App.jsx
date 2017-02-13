import Login from './Login.jsx';
import React from 'react';
import Vote from './Vote.jsx';

export default class App extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor () {
    super();

    this.state = {
      isLoggedIn: false
    };
  }

  handleLogin () {
    this.state.isLoggedIn = true;
    this.context.router.push('/');
  }

  render () {
    let returnText;
    if (this.state.isLoggedIn) {
      returnText = <Vote />;
    } else {
      returnText = <Login onClick={() => this.handleLogin()} />;
    }

    return (returnText);
  }
}
