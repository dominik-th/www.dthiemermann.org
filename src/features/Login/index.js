import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import qs from 'query-string';
import { loginUser, cancelWithError } from '../../actions/auth';
import LoadingScreen from '../../components/LoadingScreen';

class Login extends Component {

  componentWillMount() {
    const params = qs.parse(this.props.location.search);
    if (!params.provider || !params.code || !params.state) {
      // missing params, redirect
      this.props.dispatch(cancelWithError('missing params'));
    } else if (!this.props.loggedIn) {
      // todo: validate state csrf
      try {
        const state = JSON.parse(localStorage.getItem('oauth2state'));
        if (params.state === state.state && Date.now() < state.stateExpiry) {
          this.props.dispatch(loginUser(params.provider, params.code));
        } else {
          this.props.dispatch(cancelWithError('csrf verification failed'));
        }
        localStorage.removeItem('oauth2state');
      } catch (err) {
        this.props.dispatch(cancelWithError('csrf verification failed'));
      }
    }
  }

  render() {
    return (
      <div className="App">
        { this.props.loggedIn &&
          <Redirect to={{
            pathname: "/",
            state: { notification: {type: 'success', message: 'Logged In!'} }
          }} />
        }
        { this.props.error &&
          <Redirect to={{
            pathname: "/error",
            search: qs.stringify({message: this.props.error}),
            state: { notification: {type: 'error', message: this.props.error} }
          }} />
        }
        <LoadingScreen 
          subheader="Logging you in!"
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { token, error } = state.auth;
  return {
    loggedIn: token !== null,
    error
  }
};

export default connect(
  mapStateToProps
)(Login);
