import { IndexRoute, Route } from 'react-router';

import About from './About.jsx';
import App from './App.jsx';
import Core from './Core.jsx';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Ranking from './Ranking.jsx';
import React from 'react';
import Rules from './Rules.jsx';

export const getRoutes = (isLoggedIn) => {
  const authRequired = (nextState, replaceState) => {
    if (!isLoggedIn) {
      replaceState({ nextPathname: nextState.location.pathname }, '/login');
    }
  };

  return (
    <Route component={App}>
      <Route path='login' component={Login} />
      <Route path='/' component={Core} onEnter={authRequired}>
        <IndexRoute component={Home} />
        <Route path='home' component={Home} />
        <Route path='about' component={About} />
        <Route path='rules' component={Rules} />
        <Route path='ranking' component={Ranking} />
      </Route>
    </Route>
  );
};
