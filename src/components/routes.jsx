import { IndexRoute, Route } from 'react-router';

import About from './About.jsx';
import App from './App.jsx';
import Core from './Core.jsx';
import Home from './Home.jsx';
import Ranking from './Ranking.jsx';
import React from 'react';
import Rules from './Rules.jsx';
import Signup from './Signup.jsx';
import sendQuery from '../graphql.js';

export const getRoutes = (isServerSide, isLoggedIn) => {
  const handleEnter = (nextState, replace, callback) => {
    if (!isServerSide) {
      sendQuery(`isLoggedIn`, false, (data) => {
        redirect(data.isLoggedIn, nextState, replace, callback);
      });
    } else {
      redirect(isLoggedIn, nextState, replace, callback);
    }
  };

  const redirect = (loggedIn, nextState, replace, callback) => {
    const pathname = nextState.location.pathname;

    if (loggedIn && pathname === '/singup') {
      replace('/signup');
    } else if (!loggedIn && pathname !== '/signup') {
      replace('/');
    }

    callback();
  };

  return (
    <Route component={App} onEnter={handleEnter}>
      <Route path='/signup' component={Signup} />
      <Route path='/' component={Core} >
        <IndexRoute component={Home} />
        <Route path='home' component={Home} />
        <Route path='about' component={About} />
        <Route path='rules' component={Rules} />
        <Route path='ranking' component={Ranking} />
      </Route>
    </Route>
  );
};
