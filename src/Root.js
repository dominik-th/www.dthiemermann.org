import React from 'react';
import { BrowserRouter  as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';

import App from './App';

const Root = ({ store }) => (
  <Router>
    <Switch>
      <Route path="/:imageId" component={App} />
      <Route path="/" component={App} />
    </Switch>
  </Router>
);

export default Root;
