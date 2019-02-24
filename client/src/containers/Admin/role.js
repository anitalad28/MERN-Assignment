import React, { Component } from 'react';
import ApiService from '../../services/apiService';
import AdminHeader from "./../Layouts/adminHeader";
import TableHeader from "../../components/TableHeader";

class Role extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            RoleId: "",
            RoleName: "",
            Roles: [{
                        "Role Id": 0,
                        "Role Name": ""               
                    }],
            headers: [],           
        };
       
        this.service = new ApiService();
        this.generateTableHeaders();
    }

    generateTableHeaders() {
      for (let h in this.state.Roles[0]) {
        this.state.headers.push(h);
      }
    }
    
    onChangeUser (e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    //CLEAR 
    onClickClear (e) {
        this.setState({ RoleId: "" });
        this.setState({ RoleName: "" });
    }

    loadRoles(){
        this.service
            .getUserRoles()
            .then(data=>data.json())
            .then(value=>{
                this.setState({ Roles: value.data });                                                   
                console.log(JSON.stringify(value));
            })
            .catch(error=>{
                console.log(`Error occurred ${error.status}`);
            })
    }
    //LOGIN SERVICE
    onClickCreateRole = (e) => {
        let role = {
            RoleId: this.state.RoleId,
            RoleName: this.state.RoleName
        };
        
        this.service
        .createUserRole(role)
        .then(data=>data.json())
        .then(value => { this.loadRoles(); })
        .catch(error => console.log (error.status));        
    }

    //method weill be excuted immediatly after the render() completes its job
    componentDidMount(){
        this.loadRoles();
    }
        
    render() { 
        return (
            <div className='container'>
                <AdminHeader />                
                <div className='col-5'>
                    <h2>Create Roles</h2> <br />
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
                                {this.state.Roles.map((prd, idx) => (
                                    <TableRow key={idx} row={prd}/>                               
                                ))}                        
                            </tbody>
                        </table>
                    </div>
                </div>                
            </div>     
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
                <td>{this.props.row.RoleId}</td>
                <td>{this.props.row.RoleName}</td>                  
            </tr>
        )
    }
}
 
export default Role;