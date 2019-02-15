import React, { Component } from 'react';
//import './App.css';
import { Route, Router, Switch } from 'react-router-dom';
import Login from './containers/login';
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
          <Route path='/register' component={ Register } />
          <Route path='/createUserRole' component={ UserRole } />
          <Route path='/PersonalInformation' component={ PersonalInformation } />
        </Switch>
      </Router>
    );
  }
}

export default App;
