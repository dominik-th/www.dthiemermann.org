import { combineReducers } from 'redux';
import auth from './auth';
import cover from './cover';

const rootReducer = combineReducers({
  auth,
  cover
});

export default rootReducer;
