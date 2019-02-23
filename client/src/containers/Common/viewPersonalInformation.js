import React, { Component } from 'react';
import ApiService from '../../services/apiService';
import AdminHeader from "../Layouts/adminHeader";
import AccessUserHeader from '../Layouts/accessUserheader';
import OperatorDashboard from '../Operator/operatorDashboard';

class ViewPersonalInformation extends Component {
    constructor(props){
        super(props);
        this.state = { };  
        
         this.service = new ApiService();   
    }
  
    getPersonalDetails(){
        let loggedInUserId = sessionStorage.getItem("uid")  
        this.service
            .getPersonalDetails(loggedInUserId)
            .then(res => res.json())
            .then(({ data }) => {
                if(!data) {  return  }
                
                this.setState({
                        FullName: data[0].FullName.FirstName + " " + data[0].FullName.MiddleName + " " + data[0].FullName.LastName,
                        Gender: data[0].Gender, 
                        DateOfBirth: data[0].DateOfBirth,
                        Age: data[0].Age,
                        Address: data[0].Address.FlatBunglowNo + ", " + data[0].Address.SocietyName + ", " + data[0].Address.StreetAreaName,                       
                        City: data[0].Address.City,
                        State: data[0].Address.State,
                        Pincode: data[0].Address.Pincode,
                        PhoneNo: data[0].PhoneNo,
                        MobileNo: data[0].MobileNo,
                        PhysicalDisability: data[0].PhysicalDisability,
                        MaritalStatus: data[0].MaritalStatus,
                        Education: data[0].EducationalStatus,
                        BirthSign: data[0].BirthSign
                });   
            })
            .catch(error => {
                console.log(`Error occurred ${error.status}`);
            })
    }
    //method weill be excuted immediatly after the render() completes its job
    componentDidMount() {       
        let loggedInUserId = sessionStorage.getItem("uid");        
        this.service
          .getUserDetails(loggedInUserId)
          .then(data=>data.json())
          .then(({ data })=>{
            if(!data) {  return  }

            this.setState({ IsApproved: data[0].IsApproved });  
            if(data[0].IsApproved) {
                this.getPersonalDetails();
            }
          })
          .catch(error => { console.log(`Error occurred ${error.status}`); })
    }
        
    render() {         
        let loggedInUserRole = sessionStorage.getItem("role");      
        var header;
        if(loggedInUserRole === "Admin") {
           header = <AdminHeader />
        } else if(loggedInUserRole === "Operator") {
           header = <OperatorDashboard />
        } else {
           header = <AccessUserHeader />  
        }
       return  (
            <div className='container'>
                    {header}
                    {this.state.IsApproved === 'U'
                      ? 'You are not authorized to see details. Admin not approved you yet.'
                      : <div className='container'><br />
                            <h2> User Information</h2><br />
                            <div className='col-8'>
                                <table className="table">                               
                                    <tbody>
                                        <tr>
                                            <td><strong>Full Name -</strong> </td> <td>{this.state.FullName} </td>
                                        </tr>
                                        <tr>
                                            <td><strong> Gender -</strong> </td> <td>{this.state.Gender}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Date of Birth -</strong> </td><td>{this.state.DateOfBirth}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Age -</strong> </td><td>{this.state.Age}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Address - </strong></td><td> {this.state.Address} </td>
                                        </tr>
                                        <tr>
                                            <td><strong>City -</strong> </td><td>{this.state.City}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>State -</strong> </td><td>{this.state.State}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Pincode -</strong> </td><td>{this.state.Pincode}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Phone Number -</strong> </td><td>{this.state.PhoneNo}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Mobile Number -</strong> </td><td>{this.state.MobileNo}</td>
                                        </tr>
                                        <tr>
                                            <td> <strong>Birth Sign -  </strong></td><td>{this.state.BirthSign}</td>
                                        </tr>
                                        <tr>
                                            <td> <strong>Physical Disability - </strong> </td><td>{this.state.PhysicalDisability}</td>
                                        </tr>
                                        <tr>
                                            <td> <strong> Marital Status -  </strong></td><td>{this.state.MaritalStatus}</td>
                                        </tr>
                                        <tr>
                                            <td><strong> Education - </strong> </td><td>{this.state.Education}</td>
                                        </tr>                      `                      
                                    </tbody>
                                </table>
                            </div>                            
                        </div>                         
                    }
            </div>     
        )               
    }
}
 
export default ViewPersonalInformation;