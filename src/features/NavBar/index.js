import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';
import { Menu } from 'semantic-ui-react';
import { logoutUser } from '../../actions/auth';
import config from '../../env/config';
import './NavBar.css';

const propTypes = {
  type: PropTypes.oneOf(['static', 'absolute', 'fixed']),
}

const defaultProps = {
  type: 'static',
}

class NavBar extends Component {

  homeAlias = (match, location) => {
    if (!match) {
      const aliasPath = pathToRegexp('/photo/:imageId?');
      if (!aliasPath.exec(location.pathname)) {
        return false;
      }
    }
    return true;
  }

  onLogoutClick = () => {
    this.props.dispatch(logoutUser());
  }

  render() {
    const { type } = this.props;
    let navBarStyles = {};
    if (type === 'absolute' || type === 'fixed') {
      navBarStyles = {
        position: type,
        backgroundColor: 'rgba(0,0,0,.25)',
      }
    } else {
      navBarStyles = {
        backgroundColor: '#222',
      }
    }
    return (
      <div>
        <nav className="NavBar" style={navBarStyles}>
          <div className="NavBar-Left">
          </div>
          <div className="NavBar-Center">
          </div>
          <div className="NavBar-Right">
            <div className="NavItem">
              <NavLink isActive={this.homeAlias} exact to="/">Home</NavLink>
            </div>
            <div className="NavItem">
              <NavLink exact to="/photos" name='Photos'>Photos</NavLink>
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
  return {
    loggedIn: token !== null
  }
};

export default connect(
  mapStateToProps
)(NavBar);
