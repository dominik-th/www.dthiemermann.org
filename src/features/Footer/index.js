import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
                { process.env.REACT_APP_COMMIT &&
                  <p className="Git-Commit">
                    ver. {'\u0020'}
                    <a href={`https://github.com/dominik-th/www.dthiemermann.org/tree/${process.env.REACT_APP_COMMIT}`}>
                      git~{process.env.REACT_APP_COMMIT.substr(0,7)}
                    </a>
                  </p>
                }
              </p>
            </div>
            <div className="Footer-Column">
              <Header as="h4" inverted color="teal">Sitemap</Header>
              <ul>
                <li>
                  <Link to="/">
                    <Icon name="home" />Home
                  </Link>
                </li>
                <li>
                  <Link to="/photos">
                    <Icon name="photo" />Photos
                  </Link>
                </li>
                <li>
                  <Link to="/about">
                    <Icon name="id badge" />About me
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio">
                    <Icon name="book" />Portfolio
                  </Link>
                </li>
              </ul>
            </div>
            <div className="Footer-Column">
              <Header as="h4" inverted color="teal">Services</Header>
              <ul>
                <li>
                  <a href="https://git.dthiemermann.org">
                    <Icon name="git" />Gitea
                  </a>
                </li>
                <li>
                  <a href="https://cloud.dthiemermann.org">
                    <Icon name="cloud" />Seafile
                  </a>
                </li>
                <li>
                  <a href="https://rss.dthiemermann.org">
                    <Icon name="feed" />TT-RSS
                  </a>
                </li>
                <li>
                  <a href="https://pokemon.doth.pw">
                    <Icon name="calculator" />Pokémon Go IV Calculator
                  </a>
                </li>
              </ul>
            </div>
            <div className="Footer-Column">
              <Header as="h4" inverted color="teal">Social Media</Header>
              <ul>
                <li className="Github">
                  <a href="https://github.com/dominik-th">
                    <Icon name="github" />dominik-th
                  </a>
                </li>
                <li className="Flickr">
                  <a href="https://flickr.com/dthiemermann">
                    <Icon name="flickr" />dthiemermann
                  </a>
                </li>
                <li className="Twitter">
                  <a href="https://twitter.com/dthiemermann">
                    <Icon name="twitter" />dthiemermann
                  </a>
                </li>
                <li className="Reddit">
                  {
                    // eslint-disable-next-line
                  }<a href="#">
                    <Icon name="reddit" />soon&#8482;
                  </a>
                </li>
                <li className="LinkedIn">
                  {
                    // eslint-disable-next-line
                  }<a href="#">
                    <Icon name="linkedin" />soon&#8482;
                  </a>
                </li>
                <li className="Xing">
                  {
                    // eslint-disable-next-line
                  }<a href="#">
                    <Icon name="xing" />soon&#8482;
                  </a>
                </li>
                <li className="Keybase">
                  <a href="https://keybase.io/dthiemermann">
                    <Icon name="key" />dthiemermann
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
