import React, { Component } from 'react';

import { observer } from 'mobx-react';
import sendQuery from '../graphql.js';

@observer
export default class App extends Component {
  componentDidMount () {
    this.props.updateUser();

    sendQuery(`
      getTopUsers {
        username,
        noOfBoxesFound
      }
    `, false, (data) => {
      this.props.updateRankingCache(data.getTopUsers);
    });
  }

  render () {
    const topUsers = this.props.rankingCache.map((user, index) => {
      return (
        <tr key={index}>
          <td>{user.username}</td>
          <td>{user.noOfBoxesFound}</td>
        </tr>
      );
    });

    let userTable;
    if (this.props.user) {
      userTable = (
        <tr>
          <td>{ this.props.user.username }</td>
          <td>{ this.props.user.noOfBoxesFound }</td>
          <td>{ this.props.user.noOfBoxesAdded }</td>
        </tr>
      );
    }

    return (
      <div>
        <div className='container'>
          <div className='bigtext'>
            <p><b>User Statistics</b></p>
          </div>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Username</th>
                <th>Number of Boxes Found</th>
                <th>Number of Boxes Added</th>
              </tr>
            </thead>
            <tbody>
              { userTable }
            </tbody>
          </table>
          { !this.props.user ? 'Loading...' : '' }
        </div>

        <div className='container'>
          <div className='bigtext'>
            <p><b>BoxHero Ranking</b></p>
          </div>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Username</th>
                <th>Number of Boxes Found</th>
              </tr>
            </thead>
            <tbody>
              { topUsers }
            </tbody>
          </table>
          { this.props.rankingCache.length === 0 ? 'Loading...' : '' }
        </div>
      </div>
    );
  }
}
