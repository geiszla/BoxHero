import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import sendQuery from '../graphql';

@observer
export default class Login extends React.Component {
  @observable boxesFound = [];

  componentDidMount () {
    sendQuery('{getBoxesFound(firstName: "Dale") { shortId }}', (data) => {
      this.boxesFound = data.getBoxesFound;
    });
  }

  render () {
    const boxIds = this.boxesFound.map(box => (
      <div key={box.shortId}>{box.shortId}</div>
      ));

    return (
      <div>
        <button onClick={() => this.props.onClick()}>Login</button>
        <div>{boxIds}</div>
      </div>
    );
  }
}
