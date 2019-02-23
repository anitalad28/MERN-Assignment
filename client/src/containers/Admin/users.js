import React, { Component } from 'react';
import AdminService from '../../services/adminService';
import AdminHeader from "./../Layouts/adminHeader";
import { Link } from "react-router-dom";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {                        
            Users: [
              {
                "User Id": 0,
                "User Name": "",
                "Password": 0,
                "Email Address": "",
                "Role": "",
                "Action": "",
                "": ""
              }
            ],
            headers: [],
        };
              
        this.adminService = new AdminService();
        this.generateTableHeaders();
    }

    
    generateTableHeaders() {
      for (let h in this.state.Users[0]) {
        this.state.headers.push(h);
      }
    }

    loadUsers(){
        this.adminService
            .getAllPendingUsers()
            .then(data => data.json())
            .then(value => {
                this.setState({ Users: value.data });                                                   
                console.log(JSON.stringify(value));
            })
            .catch(error => {
                console.log(`Error occurred ${error.status}`);
            })
    }

    approveUser(user) {  
        let userId = user._id;

        this.adminService
            .approveUser(userId)
            .then(data =>data.json())
            .then(value => {    
                    this.loadUsers()
            })
            .catch(error=>{
                console.log(`Error occurred ${error.status}`);
            })
    }

    rejectUser(user) {
        let userId = user._id;
        this.adminService
            .rejectUser(userId)
            .then(data =>data.json())
            .then(value => {    
                this.loadUsers()
            })
            .catch(error=>{
                console.log(`Error occurred ${error.status}`);
            })
    }

      
    //method weill be excuted immediatly after the render() completes its job
    componentDidMount(){
        this.adminService
        .getAllPendingUsers()
        .then(data=>data.json())
        .then(value=>{
            this.setState({ Users: value.data });                                                   
            console.log(JSON.stringify(value));
        })
        .catch(error=>{
            console.log(`Error occurred ${error.status}`);
        })
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
                            {this.state.Users.map((prd, idx) => (
                                <TableRow key={idx} row={prd}
                                approve={this.approveUser.bind(this)}
                                reject={this.rejectUser.bind(this)}
                                />                               
                            ))}                        
                        </tbody>
                    </table>
                </div>                
            </div>     
        );         
    }
}

class TableHeader extends Component {   
    render() {
      return <th>{this.props.header}</th>;
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
                <td>
                    <Link to={{ pathname: '/add-personal-info', state: { UserId: this.props.row.UserId} }}>Add Person Info</Link>
                </td>                                     
            </tr>
        )
    }
}
 
export default Users;