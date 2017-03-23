import { Router, browserHistory } from 'react-router';

import React from 'react';
import ReactDOM from 'react-dom';
import { getRoutes } from './components/routes.jsx';
import styles from './styles/styles.styl';

window.addEventListener('load', () => {
  ReactDOM.render(
    <Router history={browserHistory}>
      { getRoutes() }
    </Router>,
    document.getElementById('root')
  );
});
