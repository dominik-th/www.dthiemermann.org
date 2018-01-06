import React, { Component } from 'react';
import { Dimmer, Header, Loader } from 'semantic-ui-react';

class LoadingScreen extends Component {
  render() {
    return (
      <Dimmer active>
        <Loader size="medium" >
          <Header as="h3" inverted color="teal" content="Loading..." />
        </Loader>
      </Dimmer>
    )
  }
}

export default LoadingScreen;
