import React, { Component } from 'react';
import ApiService from '../../services/apiService';
import AdminHeader from "./../Layouts/adminHeader";
import TableHeader from "../../components/TableHeader.jsx";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            UserId: "",
            UserName: "",
            Password: "",
            EmailAddress: "",
            IsApproved: "P",
            isUserNameUniqueValue: false,
            PersonalInfo: false,
            Role: "AccessUser",
            Roles: [],
            Users: [
              {
                "User Id": 0,
                "User Name": "",
                "Password": 0,
                "Email Address": "",
                "Role": "",
                "Status":""                
              }
            ],
            headers: [],
        };
        
        this.apiService = new ApiService();        
        this.generateTableHeaders();
        this.getUserRoles();
    }
    
    generateTableHeaders() {
      for (let h in this.state.Users[0]) {
        this.state.headers.push(h);
      }
    }
      
    onChangeUser (e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onCheckUserName(e) {     
        this.apiService
            .isUserNameUnique({ UserName: e.target.value })
            .then(data => data.json())
            .then(value => {
                console.log(value.status);
            if (value.status === 200) {               
                this.setState({isUserNameUniqueValue : true})
            } else if (value.status === 404) {                
                this.setState({isUserNameUniqueValue : false})
            }            
        })
        .catch(err => console.log(err));  
    }
    
    onClickClear (e) {
        this.setState({ UserId: "" });
        this.setState({ UserName: "" });
        this.setState({ Password: "" });
        this.setState({ EmailAddress: "" });
        this.setState({ Role: "" });        
    }

    getUserRoles(){
        this.apiService
            .getUserRoles()
            .then(data => data.json())
            .then(value => {                
                this.setState({ Roles: value.data });                                                   
                console.log('Roles' + JSON.stringify(value.data));
            })
            .catch(error => {
                console.log(`Error occurred ${error.status}`);
            })
    }

    loadUsers(){
        this.apiService
            .getUsers()
            .then(data => data.json())
            .then(value => {
                this.setState({ Users: value.data });                                                   
                console.log(JSON.stringify(value));
            })
            .catch(error => {
                console.log(`Error occurred ${error.status}`);
            })
    }
    
    onClickCreateUser = (e) => {
        let user = {
            UserId: this.state.UserId,
            UserName: this.state.UserName,
            Password: this.state.Password,
            EmailAddress: this.state.EmailAddress,
            Role: this.state.Role,
            IsApproved: this.state.IsApproved,
            PersonalInfo: this.state.PersonalInfo,
        };
      
        this.apiService
            .createUser(user)
            .then(data => data.json())
            .then(value => {                
                this.loadUsers();
                 
            })
            .catch(error => console.log (error.status));
    } 
    
    onClickUpdateUser = (e) => {
        let user = {
            UserId: this.state.UserId,
            UserName: this.state.UserName,
            Password: this.state.Password,
            EmailAddress: this.state.EmailAddress,
            Role: this.state.Role,
            IsApproved: "P",
        };
        let userId = this.state.UserId;
        this.apiService
            .updateUser(user, userId)
            .then(data => data.json())
            .then(value => {               
                this.loadUsers();                 
            })
            .catch(error => console.log (error.status));
    }   

    getSelectedProduct(u) { 
        this.setState({ UserId: u.UserId });
        this.setState({ UserName: u.UserName });
        this.setState({ Password: u.Password });
        this.setState({ EmailAddress: u.EmailAddress });
        this.setState({ Role: u.Role });
    }
    
    //method weill be excuted immediatly after the render() completes its job
    componentDidMount(){
        this.loadUsers();
    }
            
    render() { 
        return (
            <div className='container'> 
                <AdminHeader />               
                <div className='col-6'>                    
                    <h2>Create User</h2> <br />
                    <div className='form-group'>
                        <label htmlFor="UserId">User Id</label>
                        <input  type='text' 
                                name='UserId' 
                                className='form-control' 
                                value={this.state.UserId}
                                onChange={this.onChangeUser.bind(this)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="UserName">User Name</label>
                        <input 
                                type='text'
                                name='UserName' 
                                className='form-control'
                                onBlur={this.onCheckUserName.bind(this)} 
                                value={this.state.UserName} 
                                onChange={this.onChangeUser.bind(this)} />
                                {this.state.isUserNameUniqueValue ? (
                                    <p className="alert-danger">
                                    Username already used
                                    </p>
                                ) : null}
                    </div>
                     <div className='form-group'>
                        <label htmlFor="Password">Password</label>
                        <input 
                                type='password' 
                                name='Password' 
                                className='form-control' 
                                value={this.state.Password} 
                                onChange={this.onChangeUser.bind(this)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="EmailAddress">Email Address</label>
                        <input  type='text' 
                                name='EmailAddress' 
                                className='form-control' 
                                value={this.state.EmailAddress} 
                                onChange={this.onChangeUser.bind(this)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="Role">Role</label>
                        <select className="form-control" 
                                name="Role" 
                                value={this.state.Role} 
                                onChange={this.onChangeUser.bind(this)}>
                                    {this.state.Roles.map((r, idx) => (
                                        <Options key={idx} optionValue={r} />
                                    ))} 
                        </select>                         
                    </div>
                    <div className='form-group'>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <input  type='button' 
                                                value='Clear' 
                                                className='btn btn-default' 
                                                onClick={this.onClickClear.bind(this) } />
                                    </td>
                                    <td>
                                        <input  type='button' 
                                                value='Add User' 
                                                className='btn btn-default btn-success' 
                                                onClick={this.onClickCreateUser.bind(this)} />
                                    </td>
                                    <td>
                                        <input  type='button' 
                                                value='Update User' 
                                                className='btn btn-default btn-success' 
                                                onClick={this.onClickUpdateUser.bind(this)} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
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
                                  <TableRow key={idx} row={user}
                                    selected={this.getSelectedProduct.bind(this)}                                    
                                  />                               
                              ))}                        
                        </tbody>
                    </table>
                </div>                
            </div>     
        );         
    }
}

class Options extends Component {
    render(){
        return(            
            <option value={this.props.optionValue.RoleName}>{this.props.optionValue.RoleName}</option>
        );
    }
}

class TableRow extends Component{
    onRowClick(){
        this.props.selected(this.props.row);
    };
    render(){
        const IsApproved = this.props.row.IsApproved;  
        let userStatus = "";

        if(IsApproved === "A") {
            userStatus ="Approved";
        } else if(IsApproved === "U") {
            userStatus = "Rejected";            
        } if(IsApproved === "P") {
            userStatus = "Pending";  
        }

        return(
            <tr onClick={this.onRowClick.bind(this)}>
                <td>{this.props.row.UserId}</td>
                <td>{this.props.row.UserName}</td>
                <td>{this.props.row.Password}</td>
                <td>{this.props.row.EmailAddress}</td>
                <td>{this.props.row.Role}</td>               
                <td>{userStatus}</td>                              
            </tr>
        )
    }
}
 
export default User;