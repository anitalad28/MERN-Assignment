import React, { Component } from 'react';
import AdminHeader from "./../Layouts/adminHeader";

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { };        
    }
  
    render() { 
        return (
           <div className='container'>                              
             <AdminHeader />            
          </div>    
        );         
    }
}
 
export default AdminDashboard;