import React, { Component } from 'react';

import Navigation from './Navigation.jsx';

export default class App extends Component {
  render () {
    return (
      <div>
        <video id='bgvid' playsInline autoPlay muted loop>
          <source src='background.mp4' type='video/mp4' />
        </video>
        <Navigation />
        {this.props.children}
      </div>
    );
  }
}
