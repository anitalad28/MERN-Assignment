import React, { Component } from 'react';
import UserService from '../../services/userService';

class ViewPersonalInformation extends Component {
    state = {};
    userService = new UserService();
  
    getPersonalDetails(){
        let loggedInUserId = sessionStorage.getItem("uid")  
        this.userService
            .getPersonalDetails(loggedInUserId)
            .then(res => res.json())
            .then(({ data })=>{
                if(!data) {
                    return
                }
                console.log(JSON.stringify(data[0]));
                let FullName = data[0].FullName
                this.setState({ FullName: FullName.FirstName + " " + FullName.MiddleName + " " + FullName.LastName});   
            })
            .catch(error=>{
                console.log(`Error occurred ${error.status}`);
            })
    }
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
            if(data[0].IsApproved) {
                this.getPersonalDetails();
            }
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
                      : <div className='container'>
                            <h2>Access User Information</h2><br />
                            <table className="table table-bordered table-striped">                               
                                <tbody>
                                    <tr>
                                        <td>Full Name</td><td>{this.state.FullName} </td>
                                    </tr>                                            
                                </tbody>
                            </table>
                        </div>                         
                    }
            </div>     
        )               
    }
}


 
export default ViewPersonalInformation;