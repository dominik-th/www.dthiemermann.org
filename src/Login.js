import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import qs from 'query-string';
import { loginUser, cancelWithError } from './actions/auth';
import LoadingScreen from './LoadingScreen';

class Login extends Component {

  componentWillMount() {
    const params = qs.parse(this.props.location.search);
    if (!params.provider || !params.code || !params.state) {
      // missing params, redirect
      this.props.dispatch(cancelWithError('missing params'));
    } else if (!this.props.loggedIn) {
      // todo: validate state csrf
      this.props.dispatch(loginUser(params.provider, params.code));
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
