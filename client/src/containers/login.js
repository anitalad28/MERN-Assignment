import React, { Component } from 'react';
import UserService from '../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            Username: "",
            Password: ""            
        };
        // this.service = new LoginService ();
        this.service = new UserService();
    }

    onChangeUser (e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    //CLEAR 
    onClickClear (e) {
        this.setState({ Username: "" });
        this.setState({ Password: "" });
    }

    //LOGIN SERVICE
    onClickLogin = (e) => {
        let user = {
            Username: this.state.Username,
            Password: this.state.Password
        };
        // alert (console.log (JSON.stringify (user)));

        this.service
            .loginUser(user)
            .then(data=>data.json())
            .then(value => {
                            console.log(JSON.stringify(value));
                            sessionStorage.setItem("token",value.token);
                            })
            .catch(error => console.log (error.status));
        
            const history = this.props.history;
            history.push('/PersonalInformation');
    }

    onClickRegisterUserPage = () => { // ES6 formart --Arrow function
        const history = this.props.history;
        history.push('/register');
    }
    
    render() { 
        return (
            <div className='container'>                
                <div className='col-5'>
                    <h1>Login</h1> <br />
                    <div className='form-group'>
                        <label htmlFor="UserName">User Name</label>
                        <input type='text' name='Username' className='form-control' value={this.state.Username} onChange={this.onChangeUser.bind(this)} required/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="Password">Password</label>
                        <input type='password' name='Password' className='form-control' value={this.state.Password} onChange={this.onChangeUser.bind(this)} required/>
                    </div>
                    <div className='form-group'>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type='button' value='Reset' className='btn btn-default' onClick={ this.onClickClear.bind(this) } />
                                    </td>
                                    <td>
                                    <input type='button' value='Login' className='btn btn-default btn-success' onClick={this.onClickLogin.bind(this)} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <br />
                <span> Not a user?&nbsp;&nbsp;&nbsp;
                    <button className='btn btn-default btn-success' onClick={this.onClickRegisterUserPage}> Please Sign Up</button>
                </span>
            </div>     
        );         
    }
}
 
export default Login;