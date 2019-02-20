import React, { Component } from 'react';
import UserService from '../../services/userService';
import AdminHeader from "./../Layouts/adminHeader";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {            
            Role: "AccessUser",
            Roles: ["AccessUser", "Admin", "Operator"],
            Users: [
              {
                "User Id": 0,
                "User Name": "",
                "Password": 0,
                "Email Address": "",
                "Role": "",
                "Action": ""
              }
            ],
            headers: [],
        };
              
        this.userService = new UserService();
        this.generateTableHeaders();
    }

    
    generateTableHeaders() {
      for (let h in this.state.Users[0]) {
        this.state.headers.push(h);
      }
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
                <AdminHeader /><br />
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
                                  <TableRow key={idx} row={prd}/>                               
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

class TableRow extends Component{
    onRowClick(){
        this.props.selected(this.props.row);
    };

    onClickApprove(){
        this.props.approve(this.props.row);
    };

    render(){        
        return(
            <tr onClick={this.onRowClick.bind(this)}>
                <td>{this.props.row.UserId}</td>
                <td>{this.props.row.UserName}</td>
                <td>{this.props.row.Password}</td>
                <td>{this.props.row.EmailAddress}</td>
                <td>{this.props.row.Role}</td>
                <td><input type="button" value="Approve" className="btn btn-warning" onClick={this.onClickApprove.bind(this)} /></td>                               
            </tr>
        )
    }
}
 
export default Users;