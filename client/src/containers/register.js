import React, { Component } from 'react';
import UserService from '../services/userService';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            UserId: 0,
            UserName: "",
            Password: "",
            EmailAddress: ""            
        };        
        this.service = new UserService();
    }

    onChangeUser (e) {
        this.setState ({ [e.target.name]: e.target.value });
    }

     //CLEAR 
     onClickClear (e) {
        this.setState({ UserId: "0" });
        this.setState({ UserName: "" });
        this.setState({ Password: "" });
        this.setState({ EmailAddress: "" });        
    }

    //LOGIN SERVICE
    onClickRegisterUser = (e) => {
        let user = {
            UserId: this.state.UserId,
            UserName: this.state.UserName,
            Password: this.state.Password,           
            EmailAddress: this.state.EmailAddress,
            Role: "AccessUser"   // Default user role        
        };
        
        this.service
            .createUser(user)
            .then(data=>data.json())
            .then(value => {
                                console.log(JSON.stringify(value));
                                        
                                const history = this.props.history;
                                history.push('/');
                            })
            .catch(error => console.log (error.status));     
        
    }

    render() { 
        return ( 
            <div>                
                <div className='container'>
                    <h1>Please Register</h1> <br />
                    <div className='col-5'>
                        <div className='form-group'>
                            <label htmlFor="UserId">User Id</label>
                            <input type='text' name='UserId' className='form-control' value={this.state.UserId} onChange={this.onChangeUser.bind(this)} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="EmailAddress">Email Address</label>
                            <input type='text' name='EmailAddress' className='form-control' value={this.state.EmailAddress} onChange={this.onChangeUser.bind(this)} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="UserName">User Name</label>
                            <input type='text' name='UserName' className='form-control' value={this.state.UserName} onChange={this.onChangeUser.bind(this)} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="Password">Password</label>
                            <input type='password' name='Password' className='form-control' value={this.state.Password} onChange={this.onChangeUser.bind(this)} />
                        </div>                        
                        <div className="form-group">
                            <input type='button' value='Reset' className='btn btn-default' onClick={ this.onClickClear.bind(this)} />
                            <input type='button' value='Register' className='btn btn-success' onClick={this.onClickRegisterUser.bind(this)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Register;