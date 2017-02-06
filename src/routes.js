import { IndexRoute, Route } from 'react-router';

import App from './components/App';
import Login from './components/Login';
import React from 'react';
import Vote from './components/Vote';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Vote} />
    <Route path='login' component={Login} />
  </Route>
);
