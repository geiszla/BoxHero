import React, { Component } from 'react';

export default class About extends Component {
  render () {
    return (
      <div className='container'>
        <div className='bigtext'>
          <p><b>About BoxHero</b></p>
        </div>
        <div className='otherText'>
          <br />
          <p>BoxHero is a web app designed and built by Y4, a small group of developers from the University of Manchester
            who want to make the city a more exciting place to be. A group thrown together by a University project,
            our ambition is to provide a premium quality web app that people can be proud to be a part of.</p>
          <p>BoxHero itself is simple. There are boxes out in Manchester, tracked by BoxHero.
            Your aim as a player is to find and place boxes to score points for bragging rights,
            but more importantly to explore the world around you and have fun</p>
        </div>
      </div>
    );
  }
}
