import { Glyphicon, Nav, NavItem, Navbar } from 'react-bootstrap';
import React, { Component } from 'react';

import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

export default class Navigation extends Component {
  render () {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='home'>Box Hero</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav>
            <LinkContainer to='home'>
              <NavItem>Home</NavItem>
            </LinkContainer>
            <LinkContainer to='about'>
              <NavItem>About</NavItem>
            </LinkContainer>
            <LinkContainer to='rules'>
              <NavItem>Rules</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <LinkContainer to='login'>
              <NavItem>
                <Glyphicon glyph='log-in' />
                {' Login'}
              </NavItem>
            </LinkContainer>
            <LinkContainer to='register'>
              <NavItem>
                <Glyphicon glyph='new-window' />
                {' Register'}
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
