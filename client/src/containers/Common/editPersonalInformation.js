import React, { Component } from 'react';
import ApiService from '../../services/apiService';
import AdminHeader from "../Layouts/adminHeader";
import AccessUserHeader from '../Layouts/accessUserheader';
import OperatorDashboard from '../Operator/operatorDashboard';
import Options from "../../components/optionComponent";

class editPersonalInformation extends Component {
    constructor(props) {
        super(props);  
        this.state = { 
            PersonUniqueId: "0",
            FirstName: "",
            MiddleName: "",
            LastName: "",
            Genders: ["Male","Female","Transgender"],
            DateOfBirth: "",
            Age: "0",
            FlatBunglowNo: "",
            SocietyName: "",
            StreetAreaName: "",
            City: "",
            State: "",
            Pincode: "",
            PhoneNo: "",
            MobileNo: "",
            PhysicalDisability: "",
            MaritalStatues: ["Single","Married","Divorced","Widow","Widower"],
            EducationalStatues: ["Masters","Phd","Graduate","Under-Graduate", "SSC", "Illiterate", "HSC"],
            BirthSign: "",
            loggedInUserId: sessionStorage.getItem("uid")      
        };

       this.service = new ApiService();     
    }

    onChangeUser(e) {
        if (e.target.name === "DateOfBirth") {
          this.setState({
            Age: new Date().getFullYear() - e.target.value.split("-")[0]
          });
        }
        this.setState({
          [e.target.name]: e.target.value
        });
      }

    //CLEAR 
    onClickClear (e) {
        this.setState({ PersonUniqueId: "0" });
        this.setState({ FirstName: "" });
        this.setState({ MiddleName: "" });
        this.setState({ LastName: "" });
        this.setState({ Gender: "" });
        this.setState({ DateOfBirth: "" });
        this.setState({ Age: "" });
        this.setState({ FlatBunglowNo: "" });
        this.setState({ SocietyName: "" });
        this.setState({ StreetAreaName: "" });
        this.setState({ City: "" });
        this.setState({ State: "" });
        this.setState({ Pincode: "" });
        this.setState({ PhoneNo: "" });
        this.setState({ MobileNo: "" });
        this.setState({ PhysicalDisability: "" });
        this.setState({ MaritalStatus: "" });
        this.setState({ EducationalStatus: "" });
        this.setState({ BirthSign: "" });
    }

    updateUserStatus(){
        this.service
            .pendingUser(this.state.loggedInUserId)
            .then(data=>data.json())
            .then(value => { })
            .catch(error => console.log (error.status));    
    }

    onClickEditPersonalInfo = (e) => {        
        let personalInfo = {
            PersonUniqueId:  this.state.PersonUniqueId,
            FullName: {
                FirstName: this.state.FirstName,
                MiddleName: this.state.MiddleName,
                LastName: this.state.LastName,
            },            
            Gender: this.state.Gender,
            DateOfBirth: this.state.DateOfBirth,
            Age: this.state.Age,
            Address:{
                FlatBunglowNo: this.state.FlatBunglowNo,
                SocietyName: this.state.SocietyName,
                StreetAreaName: this.state.StreetAreaName,
                City: this.state.City,
                State: this.state.State,
                Pincode: this.state.Pincode,
            },            
            PhoneNo: this.state.PhoneNo,
            MobileNo: this.state.MobileNo,
            PhysicalDisability: this.state.PhysicalDisability,
            MaritalStatus: this.state.MaritalStatus,
            EducationalStatus:  this.state.EducationalStatus,
            BirthSign: this.state.BirthSign,          
            loggedInUserId:  this.state.loggedInUserId       
        };
        
        this.service
            .updatePersonalInfo(personalInfo, this.state.loggedInUserId )
            .then(data=>data.json())
            .then(value => {
                                this.updateUserStatus();
                                const history = this.props.history;
                                history.push("/view-personal-info");
                            })
            .catch(error => console.log (error.status));            
    }
    getPersonalDetails(){
        let loggedInUserId = sessionStorage.getItem("uid");        
        this.service
          .getPersonalDetails(loggedInUserId)
          .then(data=>data.json())
          .then(({ data })=>{
            if(!data) {  return  }
            if( data.length ){
                console.log(data[0].FullName.FirstName);
                this.setState({ PersonUniqueId: data[0].PersonUniqueId });
                this.setState({ FirstName: data[0].FullName.FirstName });
                this.setState({ MiddleName: data[0].FullName.MiddleName });
                this.setState({ LastName: data[0].FullName.LastName });
                this.setState({ Gender: data[0].Gender });
                this.setState({ DateOfBirth: data[0].DateOfBirth });
                this.setState({ Age: data[0].Age });
                this.setState({ FlatBunglowNo: data[0].Address.FlatBunglowNo });
                this.setState({ SocietyName: data[0].Address.SocietyName });
                this.setState({ StreetAreaName: data[0].Address.StreetAreaName });
                this.setState({ City: data[0].Address.City });
                this.setState({ State: data[0].Address.State });
                this.setState({ Pincode: data[0].Address.Pincode });
                this.setState({ PhoneNo: data[0].PhoneNo });
                this.setState({ MobileNo: data[0].MobileNo });
                this.setState({ PhysicalDisability: data[0].PhysicalDisability });
                this.setState({ MaritalStatus: data[0].MaritalStatues });
                this.setState({ EducationalStatus: data[0].EducationalStatus });
                this.setState({ BirthSign: data[0].BirthSign });
            } else {
                this.setState({ data: 'No Personal Data' });
            }                
          })
          .catch(error => { console.log(`Error occurred ${error.status}`); })
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
            this.getPersonalDetails();
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
        return ( 
            <div className='container'> 
                {header} <br />
                {this.state.IsApproved === 'U'
                    ? <div className='col-8'>  <br /> You are not authorized to see details. Admin has rejected your request.</div>
                    : <div className='container'>
                        <div className='col-8'>
                            <h2>Edit Personal Information </h2> <br />
                            {this.state.data
                            ? 'PersonalInformation has been not been added'
                            :   <div className='container'>
                                    <div className='form-group'>                        
                                        <label htmlFor="PersonUniqueId">Person Id</label>
                                        <input type='text' name='PersonUniqueId' className='form-control' value={this.state.PersonUniqueId} onChange={this.onChangeUser.bind(this)} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="FirstName">First Name</label>
                                        <input type='text' name='FirstName' className='form-control' value={this.state.FirstName} onChange={this.onChangeUser.bind(this)} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="MiddleName">Middle Name</label>
                                        <input type='text' name='MiddleName' className='form-control' value={this.state.MiddleName} onChange={this.onChangeUser.bind(this)} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="LastName">Last Name</label>
                                        <input type='text' name='LastName' className='form-control' value={this.state.LastName} onChange={this.onChangeUser.bind(this)} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="Gender">Gender</label>
                                        <select className="form-control" name="Gender" value={this.state.Gender} onChange={this.onChangeUser.bind(this)}>
                                            {this.state.Genders.map((c, i) => (
                                                <Options key={i} data={c} />
                                            ))}
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="DateOfBirth">DateOfBirth</label>
                                        <input type='date' name='DateOfBirth' className='form-control' value={this.state.DateOfBirth} onChange={this.onChangeUser.bind(this)} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="Age">Age</label>
                                        <input type='text' name='Age' className='form-control' value={this.state.Age} onChange={this.onChangeUser.bind(this)} disabled />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="FlatBunglowNo">Flat/Bunglow No</label>
                                        <input type='text' name='FlatBunglowNo' className='form-control' value={this.state.FlatBunglowNo} onChange={this.onChangeUser.bind(this)} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="SocietyName">Society Name</label>
                                        <input type='text' name='SocietyName' className='form-control' value={this.state.SocietyName} onChange={this.onChangeUser.bind(this)} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="StreetAreaName">Street/Area Name</label>
                                        <input type='text' name='StreetAreaName' className='form-control' value={this.state.StreetAreaName} onChange={this.onChangeUser.bind(this)} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="City">City</label>
                                        <input type='text' name='City' className='form-control' value={this.state.City} onChange={this.onChangeUser.bind(this)} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="State">State</label>
                                        <input type='text' name='State' className='form-control' value={this.state.State} onChange={this.onChangeUser.bind(this)} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="Pincode">Pincode</label>
                                        <input type='text' name='Pincode' className='form-control' value={this.state.Pincode} onChange={this.onChangeUser.bind(this)} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="PhoneNo">Phone No </label>
                                        <input type='text' name='PhoneNo' className='form-control' value={this.state.PhoneNo} onChange={this.onChangeUser.bind(this)} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="MobileNo">Mobile No </label>
                                        <input type='text' name='MobileNo' className='form-control' value={this.state.MobileNo} onChange={this.onChangeUser.bind(this)} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="PhysicalDisability">Physical Disability</label>
                                        <input type='text' name='PhysicalDisability' className='form-control' value={this.state.PhysicalDisability} onChange={this.onChangeUser.bind(this)} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="MaritalStatus">Marital Status</label>
                                        <select className="form-control" name="MaritalStatus" value={this.state.MaritalStatus} onChange={this.onChangeUser.bind(this)}>
                                            {this.state.MaritalStatues.map((c, i) => (
                                                <Options key={i} data={c} />
                                            ))}
                                        </select>
                                    </div> 
                                    <div className='form-group'>
                                        <label htmlFor="EducationalStatus">Educational Status</label>
                                        <select className="form-control" name="EducationalStatus" value={this.state.EducationalStatus} onChange={this.onChangeUser.bind(this)}>
                                            {this.state.EducationalStatues.map((c, i) => (
                                                <Options key={i} data={c} />
                                            ))}
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="BirthSign">Birth Sign</label>
                                        <input type='text' name='BirthSign' className='form-control' value={this.state.BirthSign} onChange={this.onChangeUser.bind(this)} />
                                    </div>
                                    <div className='form-group'>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <input type='button' value='Reset' className='btn btn-default' onClick={this.onClickClear.bind(this)} />
                                                    </td>
                                                    <td>
                                                        <input type='button' value='Edit Personal Information' className='btn btn-default btn-success' onClick={this.onClickEditPersonalInfo.bind(this)} />
                                                    </td>                                    
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div> 
                                </div>
                            }
                        </div>              
                    </div>
                }                             
            </div>    
        );
    }
}
 
export default editPersonalInformation;