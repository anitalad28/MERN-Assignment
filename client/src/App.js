import React, { Component } from 'react';
//import './App.css';
import { Route, Router, Switch } from 'react-router-dom';
import Login from './containers/login';
import AdminDashboard from './containers/adminDashboard';
import UserDashboard from './containers/userDashboard';
import OperatorDashboard from './containers/operatorDashboard';

import Register from './containers/register';
import UserRole from './containers/userrole';
import PersonalInformation from './containers/personalInformation';

import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={ Login } />

          <Route exact path="/admin-dashboard" component={ AdminDashboard } /> 
          <Route exact path="/user-dashboard" component={ UserDashboard } /> 
          <Route exact path="/operator-dashboard" component={ OperatorDashboard } /> 
          <Route path='/createUserRole' component={ UserRole } />
                   

          <Route path='/register' component={ Register } />
          
          <Route path='/PersonalInformation' component={ PersonalInformation } />
        </Switch>
      </Router>
    );
  }
}

export default App;
