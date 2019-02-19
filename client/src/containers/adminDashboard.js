import React, { Component } from 'react';
import { Link } from "react-router-dom";

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
        };        
    }
  
    render() { 
        return (
           <div className='container'> 
                <h1>This is Admin Dashboard</h1> <br /> 
            
            <nav className="navbar navbar-expand-lg ">              
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/new-user">
                    New User
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-user-personal-info">
                    Personal Info
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/role">
                    Roles
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">
                    Logout
                  </Link>
                </li>
              </ul>
            </nav> 
          </div>    
        );         
    }
}
 
export default AdminDashboard;