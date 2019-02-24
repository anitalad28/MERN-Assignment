import React, { Component } from 'react';
import Users from "./users";

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { };        
    }
  
    render() { 
        return (
           <div className='container'>   
             <Users />            
          </div>    
        );         
    }
}
 
export default AdminDashboard;