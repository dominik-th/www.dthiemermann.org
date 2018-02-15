import config from '../env/config';

export const LOGGING_IN = 'LOGGING_IN';
export function loggingIn() {
  return {
    type: LOGGING_IN
  }
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export function loginSuccess(token) {
  return {
    type: LOGIN_SUCCESS,
    token
  }
}

export const LOGIN_FAILED = 'LOGIN_FAILED';
export function loginFailed(message) {
  return {
    type: LOGIN_FAILED,
    message
  }
}

export const LOGGING_OUT = 'LOGGING_OUT';
export function loggingOut() {
  return {
    type: LOGGING_OUT
  }
}

export const CANCEL_WITH_ERROR = 'CANCEL_WITH_ERROR';
export function cancelWithError(message) {
  return {
    type: CANCEL_WITH_ERROR,
    message
  }
}

export function loginUser(provider, code) {
  return function(dispatch) {
    dispatch(loggingIn());
    return fetch(`${config.backend.url}/auth?provider=${provider}&code=${code}`).then(
      response => response.json(),
    ).then(
      json => {
        if (json.success) {
          dispatch(loginSuccess(json.token));
        } else {
          dispatch(loginFailed(json.message));
        }
      },
      error => {
        dispatch(loginFailed('error logging in'));
      }
    );
  }
}

export function logoutUser() {
  return function(dispatch, getState) {
    const token = getState().auth.token;
    dispatch(loggingOut());
    return fetch(`${config.backend.url}/token/revoke/${token}`, {
      method: 'get',
      headers: new Headers({
        'Authorization': 'token ' + token
      })
    }).then(
      response => response.json(),
    ).then(
      json => {
        if (json.success) {
          // successfully revoked token
        } else {
          // did not revoke token
        }
      },
      error => {
        // request failed
      }
    )
  }
}
