import React from 'react';
import ReactDOM from 'react-dom';

import VoteForm from './components/voteForm.js';

export function VotePage () {
  ReactDOM.render(
    <VoteForm />,
    document.getElementById('root')
  );
}
