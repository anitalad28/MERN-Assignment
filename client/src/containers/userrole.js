import React, { Component } from 'react';
import AdminService from '../services/adminService';

class UserRole extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            RoleId: "",
            RoleName: ""            
        };
        // this.service = new LoginService ();
        this.service = new AdminService();
    }

    onChangeUser (e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    //CLEAR 
    onClickClear (e) {
        this.setState({ RoleId: "" });
        this.setState({ RoleName: "" });
    }

    //LOGIN SERVICE
    onClickCreateRole = (e) => {
        let role = {
            RoleId: this.state.RoleId,
            RoleName: this.state.RoleName
        };
        // alert (console.log (JSON.stringify (user)));

        this.service
            .createUserRole(role)
            .then(data=>data.json())
            .then(value => {
                            console.log(JSON.stringify(value))
                            })
            .catch(error => console.log (error.status));
        
        // const history = this.props.history;
        // history.push ('/register');
    }
        
    render() { 
        return (
            <div className='container'>                
                <div className='col-5'>
                    <h1>Create User Roles</h1> <br />
                    <div className='form-group'>
                        <label htmlFor="RoleId">Role Id</label>
                        <input type='text' name='RoleId' className='form-control' value={this.state.RoleId} onChange={this.onChangeUser.bind(this)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="RoleName">Role Name</label>
                        <input type='text' name='RoleName' className='form-control' value={this.state.RoleName} onChange={this.onChangeUser.bind(this)} />
                    </div>
                    <div className='form-group'>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type='button' value='Clear' className='btn btn-default' onClick={ this.onClickClear.bind(this) } />
                                    </td>
                                    <td>
                                    <input type='button' value='Add Role' className='btn btn-default btn-success' onClick={this.onClickCreateRole.bind(this)} />
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
 
export default UserRole;