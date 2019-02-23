import React, { Component } from 'react';
import ViewPersonalInformation from "../Common/viewPersonalInformation";

class AccessUserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { };        
    }
  
    render() { 
        return (            
            <div className='container'>               
                <div className='col-8'>
                    <ViewPersonalInformation />
                </div>
            </div>  
        );         
    }
}
 
export default AccessUserDashboard;