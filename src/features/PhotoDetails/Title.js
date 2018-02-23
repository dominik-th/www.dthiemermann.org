import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header } from 'semantic-ui-react';
import './Title.css';

const propTypes = {
  text: PropTypes.string.isRequired,
  description: PropTypes.string,
}

const defaultProps = {
  description: "\u003Cno description\u003E",
}

class Title extends Component {
  render() {
    return (
      <div className="Photo-Title">
        <Container>
          <Header as="h1" inverted color="teal">{ this.props.text }</Header>
          <p>
            { this.props.description }
          </p>
        </Container>
      </div>
    );
  }
}

Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

export default Title;
