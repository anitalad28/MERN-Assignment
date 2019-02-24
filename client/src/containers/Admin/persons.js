import React, { Component } from 'react';
import ApiService from '../../services/apiService';
import AdminHeader from "./../Layouts/adminHeader";
import TableHeader from "../../components/TableHeader.jsx";

class Persons extends Component {
    constructor(props) {
        super(props);
        this.state = {                        
            Persons: [{
                "Person Id": "",               
                "Age": "",
                "Mobile No": ""
              }],
            headers: [],
        };
              
        this.apiService = new ApiService();
        this.generateTableHeaders();
    }
    
    generateTableHeaders() {
      for (let h in this.state.Persons[0]) {
        this.state.headers.push(h);
      }
    }

    loadPersons(){
        this.apiService
            .getPersons()
            .then(data => data.json())
            .then(value => {
                this.setState({ Persons: value.data });
            })
            .catch(error => {
                console.log(`Error occurred ${error.status}`);
            })
    }

    //method weill be excuted immediatly after the render() completes its job
    componentDidMount(){
        this.loadPersons();
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
                            {this.state.Persons.map((person, idx) => (
                                <TableRow   key={idx} row={person} rec={this.state.Persons}/>                               
                            ))}                        
                        </tbody>
                    </table>
                </div>                
            </div>     
        );         
    }
}

class TableRow extends Component {    
    render(){
        return(
            <tr>               
                <td>{this.props.row.PersonUniqueId}</td>                
                <td>{this.props.row.Age}</td>                
                <td>{this.props.row.MobileNo}</td>                                                    
            </tr>
        )
    };
}
 
export default Persons;