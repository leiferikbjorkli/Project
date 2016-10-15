import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import MainContainer from './components/containers/MainContainer.jsx';

const store = configureStore();

const routes =
(
  <Route path="/" component={MainContainer}>
    <IndexRoute component={MainContainer} />
  </Route>
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app')
);
