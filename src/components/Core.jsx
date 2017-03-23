import React, { Component } from 'react';

import Navigation from './Navigation.jsx';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import sendQuery from '../graphql.js';

@observer
export default class App extends Component {
  @observable rankingCache = [];
  @observable user = {};

  updateUser (user) {
    sendQuery(`
      getUserStats {
        username,
        noOfBoxesFound,
        noOfBoxesAdded
      }`, false, (data) => {
        const userStats = data.getUserStats;

        this.username = data.getUserStats.username;
        this.user = {
          username: userStats.username,
          noOfBoxesFound: userStats.noOfBoxesFound,
          noOfBoxesAdded: userStats.noOfBoxesAdded
        };
      });
  }

  updateRankingCache (ranking) {
    this.rankingCache = ranking;
  }

  render () {
    const childrenWithProps = React.Children.map(this.props.children, (child) => {
      const page = child.props.location.pathname;
      if (page === 'ranking' || page === '/ranking') {
        return React.cloneElement(child, {
          user: this.user,
          updateUser: (user) => this.updateUser(user),
          rankingCache: this.rankingCache,
          updateRankingCache: (ranking) => this.updateRankingCache(ranking)
        });
      } else {
        return child;
      }
    });

    return (
      <div>
        <Navigation {...this.props} user={this.user} updateUser={(user) => this.updateUser(user)} />
        {childrenWithProps}
      </div>
    );
  }
}

