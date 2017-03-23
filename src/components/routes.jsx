import { IndexRoute, Route } from 'react-router';

import About from './About.jsx';
import App from './App.jsx';
import Core from './Core.jsx';
import Home from './Home.jsx';
import Ranking from './Ranking.jsx';
import React from 'react';
import Rules from './Rules.jsx';
import Signup from './Signup.jsx';

export const getRoutes = (isLoggedIn) => {
  const handleEnter = (nextState, replace) => {
    if (isLoggedIn !== undefined) {
      const pathname = nextState.location.pathname;

      if (isLoggedIn && pathname === '/signup') {
        replace('/');
      } else if (!isLoggedIn && pathname !== '/signup') {
        replace('/signup');
      }
    }
  };

  return (
    <Route path='/' component={App} onEnter={handleEnter}>
      <Route component={Core} >
        <IndexRoute component={Home} />
        <Route path='home' component={Home} />
        <Route path='about' component={About} />
        <Route path='rules' component={Rules} />
        <Route path='ranking' component={Ranking} />
      </Route>
      <Route path='/signup' component={Signup} />
    </Route>
  );
};
