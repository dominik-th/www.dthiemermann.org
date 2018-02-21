import { LOCATION_CHANGE } from 'react-router-redux';
import { TOGGLE_NAVBAR, EXPAND_NAVBAR, COLLAPSE_NAVBAR } from '../actions/navbar';

const initialState = {
  navBarCollapsed: true,
};

export default function cover(state = initialState, action) {
  switch (action.type) {

    case LOCATION_CHANGE:
      return Object.assign({}, state, {
        navBarCollapsed: true,
      });

    case TOGGLE_NAVBAR:
      return Object.assign({}, state, {
        navBarCollapsed: !state.navBarCollapsed,
      });

    case EXPAND_NAVBAR:
      return Object.assign({}, state, {
        navBarCollapsed: false,
      });

    case COLLAPSE_NAVBAR:
      return Object.assign({}, state, {
        navBarCollapsed: true,
      });

    default:
      return state;

  }
};
