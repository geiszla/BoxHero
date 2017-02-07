import { IndexRoute, Route } from 'react-router';

import App from './App';
import Login from './Login';
import React from 'react';
import Vote from './Vote';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Vote} />
    <Route path='login' component={Login} />
  </Route>
);
