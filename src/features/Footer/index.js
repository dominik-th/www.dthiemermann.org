import React, { Component } from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer>
        <Container>
          <div className="Footer-Content">
            <div className="Footer-Column Made-With-Column">
              <p className="Made-With">
                www.dthiemermann.org
              </p>
            </div>
            <div className="Footer-Column">
              <Header as="h3" inverted color="teal">Title 1</Header>
              <ul>
                <li>Element 1</li>
                <li>Element 2</li>
                <li>Element 3</li>
              </ul>
            </div>
            <div className="Footer-Column">
              <Header as="h3" inverted color="teal">Social Media</Header>
              <ul>
                <li className="Github">
                  <a href="https://github.com/dominik-th">
                    <Icon name="github" />dominik-th
                  </a>
                </li>
                <li className="Reddit">
                  <a href="#">
                    <Icon name="reddit" />soon&#8482;
                  </a>
                </li>
                <li className="Twitter">
                  <a href="#">
                    <Icon name="twitter" />soon&#8482;
                  </a>
                </li>
                <li className="LinkedIn">
                  <a href="#">
                    <Icon name="linkedin" />soon&#8482;
                  </a>
                </li>
                <li className="Xing">
                  <a href="#">
                    <Icon name="xing" />soon&#8482;
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </footer>
    );
  }
}

export default Footer;
