import React, { Component } from 'react';
import ViewPersonalInformation from "./Admin/viewPersonalInformation";

class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
        };        
    }
  
    render() { 
        return (            
            <div className='container'>                
                <div className='col-5'>
                    <div className='container'>
                        <h2>User Dashboard</h2><br />
                    </div>
                     
                    <ViewPersonalInformation />
                </div>
            </div>  
        );         
    }
}
 
export default UserDashboard;