import Login from './Login';
import React from 'react';
import Vote from './Vote';

export default class App extends React.Component {
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

App.contextTypes = {
  router: React.PropTypes.object
};
