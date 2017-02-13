import { IndexRoute, Route } from 'react-router';

import App from './App.jsx';
import Login from './Login.jsx';
import React from 'react';
import Vote from './Vote.jsx';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Vote} />
    <Route path='login' component={Login} />
  </Route>
);
