import { IndexLink, Link } from 'react-router';
import React, { Component } from 'react';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
export default class Navigation extends Component {
  @observable isLoggedIn = false;

  constructor (props) {
    super(props);
    this.loggedIn = this.props.isLoggedIn;
  }

  render () {
    let menuItems;
    if (this.isLoggedIn === true) {
      menuItems = (
        <ul className='nav nav-pills pull-right'>
          <li><Link to='about'>About</Link></li>
          <li><Link to='rules'>Rules</Link></li>
          <li><Link to='ranking'>Ranking</Link></li>
          <li className='dropdown'>
            <a href='#' className='dropdown-toggle' data-toggle='dropdown'>
              <img src='https://placehold.it/20x20' className='profile-image img-circle' /> Username <b className='caret' /></a>
            <ul className='dropdown-menu'>
              <li><a href='#'><i className='fa fa-cog' /> Place a box</a></li>
              <li><a href='#'><i className='fa fa-cog' /> Account</a></li>
              <li className='divider' />
              <li><a href='#'><i className='fa fa-sign-out' /> Sign-out</a></li>
            </ul>
          </li>
        </ul>
      );
    } else {
      menuItems = (
        <ul className='nav nav-pills pull-right'>
          <li><a href='#'
            data-toggle='modal' data-target='#signUp-modal'>Sign up</a></li>
          <li><a href='#'
            data-toggle='modal' data-target='#login-modal' >Log in</a></li>
        </ul>
      );
    }

    return (
      <div className='container'>
        <div className='header clearfix'>
          <nav>
            { menuItems }
            <IndexLink to='/' activeClassName='active'><img src='images/logo8.png' /></IndexLink>
          </nav>
        </div>
      </div>
    );
  }
}
