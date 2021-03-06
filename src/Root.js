import React from 'react';
import { Redirect } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import PiwikReactRouter from 'piwik-react-router';
import thunkMiddleware from 'redux-thunk';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './utils/localStorage';
import reducer from './reducers';
import NavbarLayout from './layouts/NavbarLayout';
import NavbarFooterLayout from './layouts/NavbarFooterLayout';
import App from './scenes/App';
import Photos from './scenes/Photos';
import Map from './scenes/Map';
import Login from './features/Login';
import config from './env/config';

let history = createHistory();
if (config.piwik) {
  let piwik = PiwikReactRouter(config.piwik);
  piwik.push(['enableHeartBeatTimer']);
  piwik.push(['setCustomDimension', 1, process.env.REACT_APP_COMMIT]);
  history = piwik.connectToHistory(history);
}
const historyMiddleware = routerMiddleware(history);

const persistedState = loadState();
const store = createStore(
  reducer,
  persistedState,
  applyMiddleware(thunkMiddleware, historyMiddleware),
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
    <ConnectedRouter history={history}>
      <Switch>
        <NavbarFooterLayout navbarType="absolute" exact path="/" component={App} />
        <NavbarFooterLayout navbarType="absolute" exact path="/photo/:imageId?" component={App} />
        <NavbarFooterLayout navBarType="static" exact path="/photos" component={Photos} />
        <NavbarLayout navbarType="static" path="/map" component={Map} />
        <Route exact path="/login" component={Login} />
        <NavbarFooterLayout navbarType="absolute" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default Root;
