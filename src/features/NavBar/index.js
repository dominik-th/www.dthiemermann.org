import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
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
  onLoginClick() {
    const state = Math.random().toString(36).substr(2, 10);
    const stateExpiry = Date.now() + (60 * 1000);
    try {
      const serializedState = JSON.stringify({
        state,
        stateExpiry
      });
      localStorage.setItem('oauth2state', serializedState);
      const githubOauthUrl = config.auth.githubUrl.replace('%STATE%', state);
      window.location = githubOauthUrl;
    } catch (err) {
      console.log('Could not set CSRF protection');
    }
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
      <nav className="NavBar" style={navBarStyles}>
        <Button as={NavLink} to="/" basic inverted>
          Home
        </Button>
        <Button as={NavLink} to="photos" basic inverted>
          Photos
        </Button>
        { this.props.loggedIn ?
          <div>
            <Button onClick={this.onLogoutClick} basic inverted>
              Log Out
            </Button>
          </div>
        :
          <Button onClick={this.onLoginClick} basic icon inverted labelPosition="left">
            <Icon name="github" inverted size="large" />
            Sign In
          </Button>
        }
      </nav>
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
