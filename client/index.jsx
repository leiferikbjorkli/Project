import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import App from './Components/ContainerComponents/App.jsx';
import MainContentContainer from './Components/ContainerComponents/MainContentContainer.jsx';
import EditEventForm from './Components/ContainerComponents/EditEvent.jsx';
import NewEventForm from './Components/ContainerComponents/NewEvent.jsx';
import { history } from './history';
import { isAuthenticated, authenticate } from './auth';

const store = configureStore();

const routes =
(
  <Route path="/" component={App}>
    <IndexRoute component={MainContentContainer} />
    <Route path="/new" component={NewEventForm} />
    <Route path="/edit/:id" component={EditEventForm} />
  </Route>
);

if (!isAuthenticated()) {
  authenticate();
} else {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>,
    document.getElementById('events-app')
  );
}

