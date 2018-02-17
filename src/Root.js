import React from 'react';
import { Router, Redirect } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import PiwikReactRouter from 'piwik-react-router';
import thunkMiddleware from 'redux-thunk';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './utils/localStorage';
import reducer from './reducers';
import NavbarFooterLayout from './layouts/NavbarFooterLayout';
import App from './scenes/App';
import Photos from './scenes/Photos';
import Login from './features/Login';
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

// eslint-disable-next-line
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
        <NavbarFooterLayout navbarType="absolute" exact path="/" component={App} />
        <NavbarFooterLayout navbarType="absolute" exact path="/photo/:imageId?" component={App} />
        <NavbarFooterLayout navBarType="static" exact path="/photos" component={Photos} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  </Provider>
);

export default Root;
