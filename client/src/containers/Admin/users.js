import React, { Component } from 'react';
import ApiService from '../../services/apiService';
import AdminHeader from "./../Layouts/adminHeader";
import { Link } from "react-router-dom";
import TableHeader from "../../components/TableHeader.jsx";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {                        
            Users: [{
                    "User Id": 0,
                    "User Name": "",
                    "Password": 0,
                    "Email Address": "",
                    "Role": "",
                    "Action": "",
                    "": ""
              }],
            headers: [],
        };
              
        this.apiService = new ApiService();
        this.generateTableHeaders();
    }
    
    generateTableHeaders() {
      for (let h in this.state.Users[0]) {
        this.state.headers.push(h);
      }
    }

    loadUsers(){
        this.apiService
            .getAllPendingUsers()
            .then(data => data.json())
            .then(value => { this.setState({ Users: value.data }); })
            .catch(error => { console.log(`Error occurred ${error.status}`); })
    }

    approveUser(user) {  
        this.apiService
            .approveUser( user._id )
            .then(data =>data.json())
            .then(value => { this.loadUsers() })
            .catch(error => { console.log(`Error occurred ${error.status}`);  })
    }

    rejectUser(user) {       
        this.apiService
            .rejectUser(  user._id )
            .then(data =>data.json())
            .then(value => { this.loadUsers() })
            .catch(error=>{ console.log(`Error occurred ${error.status}`); })
    }

    //method weill be excuted immediatly after the render() completes its job
    componentDidMount(){
        this.loadUsers();
    }
        
    render() { 
        return (
            <div className='container'> 
                <AdminHeader /><br />
                 <div className="container">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {this.state.headers.map((h, i) => 
                                    ( <TableHeader key={i} header={h} /> )
                                )}
                            </tr>
                        </thead>
                         <tbody>
                            {this.state.Users.map((user, idx) => (
                                <TableRow   key = {idx} row = {user}
                                            approve = {this.approveUser.bind(this)}
                                            reject = {this.rejectUser.bind(this)} />                               
                            ))}                        
                        </tbody>
                    </table>
                </div>                
            </div>     
        );         
    }
}

class TableRow extends Component {
    onClickApprove(){
        this.props.approve(this.props.row);        
    };

    onClickReject(){
        this.props.reject(this.props.row);
    };
   
    render(){
        var setLink = "";
        if( this.props.row.PersonalInfo ) {
            setLink = <td> <Link to={{ pathname: '/edit-personal-info', state: { UserId: this.props.row.UserId} }}>Edit Person Info |</Link> <Link to={{ pathname: '/view-personal-info', state: { UserId: this.props.row.UserId} }}>View Person Info</Link></td> 
        } else {
            setLink = setLink = <td> <Link to={{ pathname: '/add-personal-info', state: { UserId: this.props.row.UserId} }}>Add Person Info</Link> </td>
        }
        return(
            <tr>
                <td>{this.props.row.UserId}</td>
                <td>{this.props.row.UserName}</td>
                <td>{this.props.row.Password}</td>
                <td>{this.props.row.EmailAddress}</td>
                <td>{this.props.row.Role}</td> 
                <td>
                    <input type="button" value="Approve" className="btn btn-warning" onClick={this.onClickApprove.bind(this)} />&nbsp;&nbsp;
                    <input type="button" value="Reject" className="btn btn-danger" onClick={this.onClickReject.bind(this)} />
                </td>
                {setLink}                                     
            </tr>
        )
    }
}
 
export default Users;