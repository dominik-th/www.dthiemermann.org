import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import navbar from './navbar';
import cover from './cover';

const rootReducer = combineReducers({
  auth,
  navbar,
  cover,
  routing: routerReducer,
});

export default rootReducer;
