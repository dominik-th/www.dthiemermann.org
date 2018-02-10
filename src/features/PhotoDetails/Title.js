import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';
import './Title.css';

class Title extends Component {
  render() {
    return (
      <div className="Photo-Title">
        <Container>
          <Header as="h2" inverted color="teal">{ this.props.text }</Header>
          <p>
            { this.props.description ? 
              this.props.description :
              "\u003Cno description\u003E"
             }
          </p>
        </Container>
      </div>
    );
  }
}

export default Title;
