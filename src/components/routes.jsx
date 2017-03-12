import { IndexRoute, Route } from 'react-router';

import About from './About.jsx';
import App from './App.jsx';
import Home from './Home.jsx';
import Login from './Login.jsx';
import React from 'react';
import Register from './Register.jsx';
import Rules from './Rules.jsx';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='home' component={Home} />
    <Route path='about' component={About} />
    <Route path='rules' component={Rules} />
    <Route path='login' component={Login} />
    <Route path='register' component={Register} />
  </Route>
);
