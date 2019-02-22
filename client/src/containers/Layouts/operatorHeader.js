import React from 'react';
import { Link } from "react-router-dom";

const OperatorHeader = function() {
  return (    
           <div className='container'> 
                <br />
                <h1>Operator Dashboard</h1> <br />             
                <nav className="navbar navbar-expand-lg navbar-light bg-light">              
                  <ul className="navbar-nav">                    
                    <li className="nav-item">
                      <Link className="nav-link" to="/add-personal-info">
                          Add Personal Info |
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/view-personal-info">
                          View Personal Info |
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

export default OperatorHeader;