import { Router, browserHistory } from 'react-router';

import App from './components/App';
import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';
import styles from './styles/styles.styl';

window.addEventListener('load', () => {
  ReactDOM.render(
    <Router routes={routes} history={browserHistory} />,
    document.getElementById('root')
  );
});
