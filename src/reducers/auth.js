import { LOGGING_IN, LOGIN_SUCCESS, LOGIN_FAILED, CANCEL_WITH_ERROR } from '../actions/auth';

const initialState = {
  token: null,
  error: null
};

export default function cover(state = initialState, action) {
  switch (action.type) {

    case LOGGING_IN:
      return Object.assign({}, state, {
        error: null
      });

    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        token: action.token,
        error: null
      });

    case LOGIN_FAILED:
      return Object.assign({}, state, {
        token: null,
        error: action.message
      });

    case CANCEL_WITH_ERROR:
      return Object.assign({}, state, {
        error: action.message
      });

    default:
      return state;

  }
};
