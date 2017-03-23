import React, { Component } from 'react';

import { Link } from 'react-router';
import Logo from './Logo.jsx';
import { Navbar } from 'react-bootstrap';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import sendQuery from '../graphql.js';

@observer
export default class Navigation extends Component {
  @observable username;

  componentDidMount () {
    this.props.updateUser();
  }

  handleLogout () {
    sendQuery('logout', false);
    this.props.router.push('/signup');
  }

  render () {
    return (
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
              <li><Link to='about'>About</Link></li>
              <li><Link to='rules'>Rules</Link></li>
              <li><Link to='ranking'>Ranking</Link></li>
              <li className='dropdown'>
                <a href='#' className='dropdown-toggle' data-toggle='dropdown'>
                  <img src='https://placehold.it/20x20' className='profile-image img-circle' />{ ` ${this.props.user.username ? this.props.user.username : 'Loading...'}` } <b className='caret' /></a>
                <ul className='dropdown-menu'>
                  <li><a href='#'><id className='fa fa-cog' /> Place a box</a></li>
                  <li ><a onClick={() => this.handleLogout()} style={{ cursor: 'pointer' }}><i className='fa fa-sign-out' /> Sign-out</a></li>
                </ul>
              </li>
            </ul>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
