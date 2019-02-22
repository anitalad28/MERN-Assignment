import React, { Component } from 'react';
import UserService from '../../services/userService';
import OperatorHeader from "./../Layouts/operatorHeader";

class ViewPersonalInformation extends Component {
    state = {};
    userService = new UserService();
  
    //method weill be excuted immediatly after the render() completes its job
    componentDidMount() {        
        let loggedInUserId = sessionStorage.getItem("uid")  
        console.log("loggedInUserId" + JSON.stringify(sessionStorage));

        this.userService
          .getUserDetails(loggedInUserId)
          .then(data=>data.json())
          .then(({ data })=>{
            if(!data) {
              return
            }
              this.setState({ IsApproved: data[0].IsApproved });   
          })
          .catch(error=>{
              console.log(`Error occurred ${error.status}`);
          })
    }
        
    render() { 
       return  (
            <div className='container'>
                    {this.state.IsApproved === 'U'
                      ? 'You are not authorized to see details. Admin not approved you yet.'
                      : 'Personal Information'}
            </div>     
        )               
    }
}


 
export default ViewPersonalInformation;