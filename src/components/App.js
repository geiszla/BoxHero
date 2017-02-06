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

  // componentDidMount () {
  //   if (!this.state.isLoggedIn) {
  //     this.context.router.push('/login');
  //   }
  // }

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
