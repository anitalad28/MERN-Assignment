import React, { Component } from 'react';
import PersonalInformation from './personalInformation';
class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
        };        
    }
  
    render() { 
        return (            
            <div className='container'> 
                <h1>This is User Dashboard</h1> <br />                    
                <PersonalInformation />                     
            </div>     
        );         
    }
}
 
export default UserDashboard;