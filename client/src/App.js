import React, { Component } from 'react';
//import './App.css';
import { Route, Router, Switch } from 'react-router-dom';
import Login from './containers/login';
import AdminDashboard from './containers/Admin/adminDashboard';
import UserDashboard from './containers/userDashboard';
import OperatorDashboard from './containers/operatorDashboard';
import User from './containers/Admin/user';
import Users from './containers/Admin/users';
import Role from './containers/Admin/role';
import PersonalInformation from './containers/Admin/personalInformation';

import Register from './containers/register';

import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path='/register' component={ Register } />
          
          <Route exact path='/' component={ Login } />

          <Route exact path="/admin-dashboard" component={ AdminDashboard } /> 
          <Route exact path="/user-dashboard" component={ UserDashboard } /> 
          <Route exact path="/operator-dashboard" component={ OperatorDashboard } /> 
          <Route exact path='/new-user' component={ User } />
          <Route exact path='/users' component={ Users } />
          <Route path='/create-role' component={ Role } />
          <Route path='/add-personal-info' component={ PersonalInformation } />          
          
          
        </Switch>
      </Router>
    );
  }
}

export default App;
