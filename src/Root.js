import React from 'react';
import { Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';
import createHistory from 'history/createBrowserHistory';
import PiwikReactRouter from 'piwik-react-router';
import App from './App';
import config from './env/config';

var history = createHistory();

if (config.piwik) {
  history = PiwikReactRouter(config.piwik).connectToHistory(history);
}

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware)
);

const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/:imageId" component={App} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </Provider>
);

export default Root;
