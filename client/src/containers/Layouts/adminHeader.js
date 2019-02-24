import React from 'react';
import { Link } from "react-router-dom";

const AdminHeader = function() {
  return (    
           <div className='container'> 
                <h1>Admin Dashboard</h1> <br />             
                <nav className="navbar navbar-expand-lg navbar-light bg-light">              
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link" to="/users">
                        List Users |
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/new-user">
                        New User |
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/persons">
                        Persons |
                      </Link>
                    </li>                    
                    <li className="nav-item">
                      <Link className="nav-link" to="/create-role">
                        Roles |
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
      )
  }

export default AdminHeader;