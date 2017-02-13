import { Router, browserHistory } from 'react-router';

import React from 'react';
import ReactDOM from 'react-dom';
import routes from './components/routes.jsx';
import styles from './styles/styles.styl';

window.addEventListener('load', () => {
  ReactDOM.render(
    <Router routes={routes} history={browserHistory} />,
    document.getElementById('root'),
  );
});
