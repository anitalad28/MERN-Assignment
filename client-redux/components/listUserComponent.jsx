import React, { Component } from "react";

class ListUsersComponent extends Component {
  constructor(props) {
    super(props);
    console.log('TEST' + JSON.stringify(props));
  }
  render() {
    return (
      <div className="container">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <td>User Id</td>
              <td>User Name</td>
              <td>Email Address</td>
            </tr>
          </thead>
          <tbody>
            {// logic to generate table rows based on data
            // that will be received from store
            // this.props.listUsersreducer.map((v, idx) => (
            //   <TableRow key={idx} prod={v} />
            // ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

// class TableRow extends Component {
//   render() {
//     return (
//       <tr>
//         <td>{this.props.prod.user.UserId}</td>
//         <td>{this.props.prod.user.UserName}</td>
//         <td>{this.props.prod.user.EmailAddress}</td>
//       </tr>
//     );
//   }
// }

export default ListUsersComponent;
