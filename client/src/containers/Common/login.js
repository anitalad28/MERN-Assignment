import React, { Component } from 'react';
import UserService from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            Username: "",
            Password: ""           
        };        
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

                            const history = this.props.history;
                            sessionStorage.setItem("token",`"Bearer ${value.token}`);
                            sessionStorage.setItem("uid", value.uid);
                            sessionStorage.setItem("role", value.role);    
                            
                            if (value.role === 'Admin') {
                                history.push("/admin-dashboard");                               
                            } else if (value.role === 'Operator') {
                                history.push("/operator-dashboard");
                            } else {
                                history.push("/user-dashboard");
                            }
                        })
            .catch(error => console.log (error.status));
    }

    onClickRegisterUserPage = () => { // ES6 formart --Arrow function
        const history = this.props.history;
        history.push('/register');
    }
    
    render() { 
        return (
            <div className="container login login">
                <div className=" row  justify-content-center align-items-center">
                    <div className="col-md-7">
                        <h1 className="text-center">Login Page</h1>
                        <hr />
                        <form>
                            <div className="form-group">
                                <label htmlFor="userName">User Name</label>
                                <input
                                type="text"
                                className="form-control"                                
                                name="Username"
                                value={this.state.Username}
                                onChange={this.onChangeUser.bind(this)}
                                placeholder="username"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                type="password"
                                className="form-control"                               
                                name="Password"
                                value={this.state.Password}
                                onChange={this.onChangeUser.bind(this)}
                                placeholder="**********"
                                />
                            </div>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={this.onClickLogin.bind(this)}
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>        
        );         
    }
}
 
export default Login;