import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import config from './env/config';
import './NavigationBar.css';

class NavigationBar extends Component {

  onLoginClick() {
    const state = Math.random().toString(36).substr(2, 10);
    const githubOauthUrl = config.auth.githubUrl.replace('%STATE%', state);
    window.location = githubOauthUrl;
  }

  onLogoutClick() {
    // this.props.dispatch(logout());
  }

  render() {
    return (
      <nav className="NavigationBar">
        { this.props.loggedIn ?
          <Button onClick={this.onLogoutClick} basic inverted>
            Log Out
          </Button>
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

const mapStateToProps = (state, ownProps) => {
  const { token } = state.auth;
  return {
    loggedIn: token !== null
  }
};

export default connect(
  mapStateToProps
)(NavigationBar);
