import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import App from './Components/ContainerComponents/App.jsx';

const store = configureStore();

const routes =
(
  <Route path="/" component={App}>
    <IndexRoute component={App} />
  </Route>
);


