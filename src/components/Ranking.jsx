import React, { Component } from 'react';

export default class App extends Component {
  render () {
    return (
      <div className='container'>
        <div className='bigtext'>
          <p><b>BoxHero Ranking</b></p>
        </div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Score:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John</td>
              <td>999</td>
            </tr>
            <tr>
              <td>Mary</td>
              <td>888</td>
            </tr>
            <tr>
              <td>July</td>
              <td>777</td>
            </tr>
            <tr>
              <td>John</td>
              <td>666</td>
            </tr>
            <tr>
              <td>Tod</td>
              <td>666</td>
            </tr>
            <tr>
              <td>Emma</td>
              <td>555</td>
            </tr>
            <tr>
              <td>Alex</td>
              <td>444</td>
            </tr>
            <tr>
              <td>Nick</td>
              <td>333</td>
            </tr>
            <tr>
              <td>Vlad</td>
              <td>222</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
