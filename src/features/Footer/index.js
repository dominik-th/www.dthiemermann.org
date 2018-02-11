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
              <Header as="h3" inverted color="teal">Sitemap</Header>
              <ul>
                <li>
                  <a href="#">
                    <Icon name="home" />Home
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Icon name="photo" />Photos
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Icon name="id badge" />About me
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Icon name="book" />Portfolio
                  </a>
                </li>
              </ul>
            </div>
            <div className="Footer-Column">
              <Header as="h3" inverted color="teal">Services</Header>
              <ul>
                <li>
                  <a href="#">
                    <Icon name="git" />Gitea
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Icon name="cloud" />Seafile
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Icon name="feed" />TT-RSS
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Icon name="calculator" />Pokémon Go IV Calculator
                  </a>
                </li>
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
