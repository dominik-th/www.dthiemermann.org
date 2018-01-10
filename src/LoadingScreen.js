import React, { Component } from 'react';
import { Dimmer, Header, Loader } from 'semantic-ui-react';
import './LoadingScreen.css';

class LoadingScreen extends Component {
  render() {
    return (
      <div className="LoadingScreen">
        <Dimmer active>
          <Loader size="medium" >
            <Header as="h3" inverted color="teal" content="Loading..." subheader={this.props.subheader} />
          </Loader>
        </Dimmer>
      </div>
    )
  }
}

export default LoadingScreen;
