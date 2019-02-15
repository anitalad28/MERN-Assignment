import React, { Component } from 'react';

class AddUserComponent extends Component {
  constructor(props){
      super(props);
  }

  // read data from UI using "refs". The "ref" and "refs" are properties of Component class
  save() {
      // 1. define local scope object
      let user = {};
      // 2. set data for the object from values received from UI
      user.UserId = this.refs.UserId.value;
      user.UserName = this.refs.UserName.value;
      user.Password = this.refs.Password.value;
      user.EmailAddress = this.refs.EmailAddress.value;
      // 3. Define a props function type that will listen to
      // the event so that it can be
      // dispatched from view (THE MOST IMPORTANT)
      this.props.AddUserClick(user);
      this.refs.UserId.value = "";
      this.refs.UserName.value = "";
      this.refs.Password.value = "";
      this.refs.EmailAddress.value = "";
  }

  // clear all inputs
  clear() {
      this.refs.UserId.value = "";
      this.refs.UserName.value = "";
      this.refs.Password.value = "";
      this.refs.EmailAddress.value = "";
  }

  render() {
    return (
      <div className="container">
        <div className="form-group">
          <label htmlFor="UserId">User Id</label>
          <input type="text" ref="UserId" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="UserName">User Name</label>
          <input type="text" ref="UserName" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="Password">Password</label>
          <input type="text" ref="Password" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="EmailAddress">Email Address</label>
          <input type="text" ref="EmailAddress" className="form-control" />
        </div>
        
        <div className="form-group">
          <input
            type="button"
            value="Reset"
            onClick={this.clear.bind(this)}
            className="btn btn-default"
          />
          <input
            type="button"
            value="Create User"
            onClick={this.save.bind(this)}
            className="btn btn-success"
          />
        </div>
      </div>
    );
  }
}

export default AddUserComponent;