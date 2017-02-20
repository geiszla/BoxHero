import { Button } from 'react-bootstrap';
import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import sendQuery from '../graphql';

@observer
export default class Login extends React.Component {
  @observable boxesFound = [];

  componentDidMount () {
    sendQuery('{getBoxesFound(firstName: "Dale") { boxesFound{ shortId } }}', (data) => {
      this.boxesFound = data.getBoxesFound.boxesFound;
    });
  }

  render () {
    const boxIds = this.boxesFound.map(box => (
      <div key={box.shortId}>{box.shortId}</div>
      ));

    return (
      <div>
        <Button onClick={() => this.props.onClick()}>Login</Button>
        <div>{boxIds}</div>
      </div>
    );
  }
}
