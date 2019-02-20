import React, { Component } from 'react';
import AdminService from '../../services/adminService';
import UserService from '../../services/userService';
import AdminHeader from "./../Layouts/adminHeader";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            UserId: "",
            UserName: "",
            Password: "",
            EmailAddress: "",
            Role: "AccessUser",
            Roles: ["AccessUser", "Admin", "Operator"],
            Users: [
              {
                "User Id": 0,
                "User Name": "",
                "Password": 0,
                "Email Address": "",
                "Role": ""                
              }
            ],
            headers: [],
        };
        
        this.adminService = new AdminService();
        this.userService = new UserService();
        this.generateTableHeaders();
    }

    
    generateTableHeaders() {
      for (let h in this.state.Users[0]) {
        this.state.headers.push(h);
      }
    }
      
    onChangeUser (e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    //CLEAR 
    onClickClear (e) {
        this.setState({ UserId: "" });
        this.setState({ UserName: "" });
        this.setState({ Password: "" });
        this.setState({ EmailAddress: "" });
        this.setState({ Role: "" });
        
    }

    //LOGIN SERVICE
    onClickCreateUser = (e) => {
        let user = {
            UserId: this.state.UserId,
            UserName: this.state.UserName,
            Password: this.state.UserId,
            EmailAddress: this.state.EmailAddress,
            Role: this.state.Role
        };
      
        this.adminService
            .createUser(user)
            .then(data=>data.json())
            .then(value => {
                            console.log(JSON.stringify(value))
                            })
            .catch(error => console.log (error.status));
        
        const history = this.props.history;
        history.push ('/admin-dashboard');
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
        let users = this.userService
                        .getUsers()
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
                <AdminHeader />               
                <div className='col-6'>                    
                    <h2>Create User</h2> <br />
                    <div className='form-group'>
                        <label htmlFor="UserId">User Id</label>
                        <input type='text' name='UserId' className='form-control' value={this.state.UserId} onChange={this.onChangeUser.bind(this)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="UserName">User Name</label>
                        <input type='text' name='UserName' className='form-control' value={this.state.UserName} onChange={this.onChangeUser.bind(this)} />
                    </div>
                     <div className='form-group'>
                        <label htmlFor="Password">Password</label>
                        <input type='password' name='Password' className='form-control' value={this.state.Password} onChange={this.onChangeUser.bind(this)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="EmailAddress">Email Address</label>
                        <input type='text' name='EmailAddress' className='form-control' value={this.state.EmailAddress} onChange={this.onChangeUser.bind(this)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="Role">Role</label>
                        <select className="form-control" name="Role" value={this.state.Role} onChange={this.onChangeUser.bind(this)}>
                            {this.state.Roles.map((c, i) => (
                                <Options key={i} data={c} />
                            ))}
                        </select>                         
                    </div>
                    <div className='form-group'>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type='button' value='Clear' className='btn btn-default' onClick={ this.onClickClear.bind(this) } />
                                    </td>
                                    <td>
                                    <input type='button' value='Add User' className='btn btn-default btn-success' onClick=        {this.onClickCreateUser.bind(this)} />
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
                                {
                                    this.state.headers.map((h, i) => 
                                        ( <TableHeader key={i} header={h} /> )
                                    )
                                }
                            </tr>
                        </thead>
                         <tbody>
                            {this.state.Users.map((prd, idx) => (
                                  <TableRow key={idx} row={prd}
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

class TableHeader extends Component {   
    render() {
        return <th>{this.props.header}</th>;
    }
}

// Componet that will render <option></option>
// props.data is the data passed from the parent of this component
class Options extends Component {
    render(){
        return(
            <option value={this.props.data}>{this.props.data}</option>
        );
    }
}

class TableRow extends Component{
    onRowClick(){
        this.props.selected(this.props.row);
    };

    render(){        
        return(
            <tr onClick={this.onRowClick.bind(this)}>
                <td>{this.props.row.UserId}</td>
                <td>{this.props.row.UserName}</td>
                <td>{this.props.row.Password}</td>
                <td>{this.props.row.EmailAddress}</td>
                <td>{this.props.row.Role}</td>                              
            </tr>
        )
    }
}
 
export default User;