import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import LoginAccountPage from '../components/LoginAccount/LoginAccountPage';
import DashboardPage from '../components/DashboardPage';
import CreateAccountPage from '../components/CreateAccount/CreateAccountPage';
import UserView from '../components/UserView/UserView';
export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginAccountPage} exact={true} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PublicRoute path="/signup" component={CreateAccountPage} />
        <PrivateRoute path="/users/:id" component={UserView}/>
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
