import React, { Component } from 'react';
import OperatorHeader from "./../Layouts/operatorHeader";

class OperatorDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { };        
    }
  
    render() { 
        return (
            <div className='container'>                
                <div className='col-5'>                    
                    <OperatorHeader />                    
                 </div>       
            </div>     
        );         
    }
}
 
export default OperatorDashboard;