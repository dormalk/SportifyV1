import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import LoginAccountPage from '../components/LoginAccountPage';
import DashboardPage from '../components/DashboardPage';
import CreateAccountPage from '../components/CreateAccountPage';
import VerificationPage from '../components/VerificationPage';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginAccountPage} exact={true} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PublicRoute path="/signup" component={CreateAccountPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
