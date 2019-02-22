import React, { Component } from 'react';
import AdminService from '../../services/adminService';
import AdminHeader from "./../Layouts/adminHeader";
import { Link } from "react-router-dom";

class addPersonalInformation extends Component {
    constructor(props) {
        super(props);        
        const {UserId} = props.location.state;
        this.state = { 
            PersonUniqueId: "0",
            FirstName: "",
            MiddleName: "",
            LastName: "",
            Genders: ["Male","Female","Transgender"],
            DateOfBirth: "",
            Age: "",
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
            loggedInUserId: UserId       
        };

       this.service = new AdminService();     
    }

    onChangeUser (e) {
        this.setState({ [e.target.name]: e.target.value });
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

    onClickAddPersonalInfo = (e) => {
        
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
         //   loggedInUserId: sessionStorage.getItem("uid")    
            loggedInUserId:  this.state.loggedInUserId       
        };
        
        this.service
            .registerPersonalInfo(personalInfo)
            .then(data=>data.json())
            .then(value => {
                            console.log(JSON.stringify(value))
                            })
            .catch(error => console.log (error.status));        
    }


    render() { 
        return ( 
            <div className='container'> 
                <AdminHeader /> <br />               
                <div className='col-5'>
                    <h2>Add Personal Information </h2> <br />
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
                        <input type='text' name='Age' className='form-control' value={this.state.Age} onChange={this.onChangeUser.bind(this)} />
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
                                        <input type='button' value='Add Personal Information' className='btn btn-default btn-success' onClick={this.onClickAddPersonalInfo.bind(this)} />
                                    </td>
                                    <td>
                                            <Link className="nav-link" to="/users"> Back to Users </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>                
            </div>    
        );
    }
}

class Options extends Component {
    render(){
        return(
            <option key={this.props.data} value={this.props.data}>{this.props.data}</option>
        );
    }
}
 
export default addPersonalInformation;