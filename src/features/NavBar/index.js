import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';
import { Button, Icon } from 'semantic-ui-react';
import { logoutUser } from '../../actions/auth';
import { toggleNavBar, collapseNavBar } from '../../actions/navbar';
import config from '../../env/config';
import { getCsrfLogin } from '../../utils/localStorage';
import './NavBar.css';

const propTypes = {
  type: PropTypes.oneOf(['static', 'absolute', 'fixed']),
}

const defaultProps = {
  type: 'static',
}

class NavBar extends Component {
  componentDidMount() {
    // prevent scroll actions on nav
    // this.refs.nav.addEventListener("touchmove", (e) => {
    //   e.preventDefault();
    // });
    // this.refs.nav.addEventListener("wheel", (e) => {
    //   e.preventDefault();
    // });
    window.addEventListener("resize", this.autoCollapseNavBar);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.autoCollapseNavBar);
  }

  homeAlias = (match, location) => {
    if (!match) {
      const aliasPath = pathToRegexp('/photo/:imageId?');
      if (!aliasPath.exec(location.pathname)) {
        return false;
      }
    }
    return true;
  }

  autoCollapseNavBar = (e) => {
    if (!this.props.navBarCollapsed && window.innerWidth > 768) {
      this.props.dispatch(collapseNavBar());
    }
  }

  onLogoutClick = () => {
    this.props.dispatch(logoutUser());
  }

  toggleNav = () => {
    this.props.dispatch(toggleNavBar());
    window.scrollTo(0,0);
  }

  render() {
    const { type } = this.props;
    let navBarStyles = {};
    if (type === 'absolute' || type === 'fixed') {
      navBarStyles = {
        position: type,
        background: this.props.navBarCollapsed ? 'rgba(0,0,0,.25)' : 'rgba(0,0,0,.5)',
        transition: 'background-color .25s ease',
      }
    } else {
      navBarStyles = {
        background: '#222',
      }
    }
    const githubOauthUrl = config.auth.githubUrl.replace('%STATE%', getCsrfLogin());
    return (
      <div>
        <nav ref="nav"  className="NavBar-Container" style={navBarStyles}>
          <div className="NavButton ToggleNav">
            <Button basic inverted icon onClick={this.toggleNav}><Icon name='bars' /></Button>
          </div>
          <div className={"NavBar " + (this.props.navBarCollapsed ? "Hidden" : "Visible")}>
            <div className="NavBar-Left">
              <div className="NavItem">
                <NavLink isActive={this.homeAlias} exact to="/">Home</NavLink>
              </div>
              <div className="NavItem">
                <NavLink exact to="/photos">Photos</NavLink>
              </div>
              <div className="NavItem">
                <NavLink to="/map">Map</NavLink>
              </div>
              <div className="NavItem">
                <NavLink exact to="#">About me</NavLink>
              </div>
              <div className="NavItem">
                <NavLink exact to="#">Portfolio</NavLink>
              </div>
            </div>
            <div className="NavBar-Center">
            </div>
            <div className="NavBar-Right">
              { this.props.loggedIn ?
                <div className="NavButton">
                  <Button inverted color="red" onClick={this.onLogoutClick}><Icon name='sign out' />Sign out</Button>
                </div>
              :
                <div className="NavButton">
                  <Button inverted color="green" as="a" href={githubOauthUrl}><Icon name='github' />Sign in</Button>
                </div>
              }
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;

const mapStateToProps = (state, ownProps) => {
  const { token } = state.auth;
  const { navBarCollapsed } = state.navbar;
  return {
    loggedIn: token !== null,
    navBarCollapsed,
  }
};

export default connect(
  mapStateToProps
)(NavBar);
