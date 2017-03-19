import React, { Component } from 'react';

import Navigation from './Navigation.jsx';
import { browserHistory } from 'react-router';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import sendQuery from '../graphql.js';

@observer
export default class App extends Component {
  @observable isLoggedIn = false;

  render () {
    console.log(this.props.isLoggedIn);
    if (this.props.isLoggedIn !== undefined) {
      this.isLoggedIn = this.props.isLoggedIn;
    } else if (this.isLoggedIn !== true) {
      sendQuery(`isLoggedIn`, false, (data) => {
        this.isLoggedIn = data.isLoggedIn;
        this.props.history.push('login');
      });
    }

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
