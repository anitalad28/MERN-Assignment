import React from 'react';
import { Link } from "react-router-dom";

const AccessUserHeader = function() {
  return (    
           <div className='container'> 
                <h1>Access User Dashboard</h1> <br />             
                <nav className="navbar navbar-expand-lg navbar-light bg-light">              
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link" to="/view-personal-info">
                            View User Details |
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/edit-personal-info">
                            Edit User Details |
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

export default AccessUserHeader;