import React, { Component } from 'react';

import { IndexLink } from 'react-router';

export default class Navigation extends Component {
  render () {
    return (
      <IndexLink to='/' activeClassName='active'>
        <img src='images/logo8.png' />
      </IndexLink>
    );
  }
}
