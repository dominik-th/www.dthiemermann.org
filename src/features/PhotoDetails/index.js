import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Title from './Title';
import StaticMap from './StaticMap';
import Specs from './Specs';
import './PhotoDetails.css';

class PhotoDetails extends Component {
  render() {
    const location = [this.props.image.location.lat, this.props.image.location.long];
    return (
      <div className="Photo-Details-Container">
        <Title text={this.props.image.title} description={this.props.image.description} />
        <Container>
          <div className="Photo-Details-Wrapper">
            <div className="Flex-Item Map-Item">
              <StaticMap className="Map" location={location} />
            </div>
            <div className="Flex-Item">
              <Specs image={this.props.image} />
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default PhotoDetails;
