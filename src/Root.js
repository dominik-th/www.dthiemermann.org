import React from 'react';
import { Router, Redirect } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import PiwikReactRouter from 'piwik-react-router';
import thunkMiddleware from 'redux-thunk';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './localStorage';
import reducer from './reducers';
import App from './App';
import Photos from './Photos';
import Login from './Login';
import config from './env/config';

var history = createHistory();

if (config.piwik) {
  history = PiwikReactRouter(config.piwik).connectToHistory(history);
}

const persistedState = loadState();
const store = createStore(
  reducer,
  persistedState,
  applyMiddleware(thunkMiddleware),
);

store.subscribe(throttle(() => {
  saveState({
    auth: {
      token: store.getState().auth.token
    }
  });
}, 1000));

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    store.getState().auth.token
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
);

const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/photos" component={Photos} />
        <Route path="/:imageId" component={App} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </Provider>
);

export default Root;
