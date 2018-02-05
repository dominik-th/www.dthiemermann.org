import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import { logoutUser } from '../../actions/auth';
import config from '../../env/config';
import './NavBar.css';

class NavBar extends Component {

  onLoginClick() {
    const state = Math.random().toString(36).substr(2, 10);
    const githubOauthUrl = config.auth.githubUrl.replace('%STATE%', state);
    window.location = githubOauthUrl;
  }

  onLogoutClick = () => {
    this.props.dispatch(logoutUser());
  }

  render() {
    return (
      <nav className="NavBar">
        { this.props.loggedIn ?
          <div>
            <Button as={NavLink} to="photos" basic inverted>
              Photos
            </Button>
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

const mapStateToProps = (state, ownProps) => {
  const { token } = state.auth;
  return {
    loggedIn: token !== null
  }
};

export default connect(
  mapStateToProps
)(NavBar);
