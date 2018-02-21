import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import cover from './cover';

const rootReducer = combineReducers({
  auth,
  cover,
  routing: routerReducer,
});

export default rootReducer;
