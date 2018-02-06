import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';
import config from '../../env/config';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer>
        <Container>
          <div className="Footer-Content">
            <div className="Footer-Column">
              <Header as="h3" inverted color="teal">Title 1</Header>
              <ul>
                <li>Element 1</li>
                <li>Element 2</li>
                <li>Element 3</li>
              </ul>
            </div>
            <div className="Footer-Column">
              <Header as="h3" inverted color="teal">Title 2</Header>
              <ul>
                <li>Element 1</li>
                <li>Element 2</li>
                <li>Element 3</li>
              </ul>
            </div>
            <div className="Footer-Column">
              <Header as="h3" inverted color="teal">Title 3</Header>
              <ul>
                <li>Element 1</li>
                <li>Element 2</li>
                <li>Element 3</li>
              </ul>
            </div>
          </div>
        </Container>
      </footer>
    );
  }
}

export default Footer;
