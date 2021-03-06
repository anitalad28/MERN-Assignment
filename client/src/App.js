import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Login from './containers/Common/login';
import Logout from './containers/Common/logout';
import AdminDashboard from './containers/Admin/adminDashboard';
import UserDashboard from './containers/AccessUser/accessUserDashboard';
import OperatorDashboard from './containers/Operator/operatorDashboard';
import User from './containers/Admin/user';
import Users from './containers/Admin/users';
import Role from './containers/Admin/role';
import AddPersonalInformation from './containers/Common/addPersonalInformation';
import EditPersonalInformation from './containers/Common/editPersonalInformation';
import ViewPersonalInformation from './containers/Common/viewPersonalInformation';
import Persons from "./containers/Admin/persons";

import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>          
          <Route exact path='/' component={ Login } />
          <Route exact path='/logout' component={ Logout } />

          <Route exact path="/admin-dashboard" component={ AdminDashboard } /> 
          <Route exact path="/user-dashboard" component={ UserDashboard } /> 
          <Route exact path="/operator-dashboard" component={ OperatorDashboard } /> 

          <Route exact path='/new-user' component={ User } />
          <Route exact path='/users' component={ Users } />
          
          <Route exact path='/create-role' component={ Role } />
          <Route exact path='/add-personal-info' component={ AddPersonalInformation } />
          <Route exact path='/edit-personal-info' component={ EditPersonalInformation } />  
          <Route exact path='/view-personal-info' component={ ViewPersonalInformation } /> 
          <Route exact path='/persons' component={ Persons } />
            
        </Switch>
      </Router>
    );
  }
}

export default App;
