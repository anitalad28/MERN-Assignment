import React, { Component } from "react";
// 1. import all components
import AddUserComponent from "./components/AddUserComponent.jsx";
import ListUsersComponent from "./components/listUserComponent.jsx";

// 2. import action from action.js. The dispatch request
// for this action will be initiated by AddProductComponent
import { addUser } from "./actions/actions.js";

import { connect } from "react-redux";

class MainReduxComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      //this.service = new UserService();
    }   

    render() {
        const { dispatch, visibleusers } = this.props;
    
        return (
            <div className="container">
                <AddUserComponent AddUserClick={(user)=> dispatch(addUser(user))}/>  
                <hr />
                <ListUsersComponent listUsersreducer={visibleusers} />         
            </div>
        );
      }
}

function mapStateToProps(state){
    console.log(`in action map to state ${JSON.stringify(state)}`);

    return {
        visibleusers: state.listUsersreducer
      };
}
export default connect(mapStateToProps)(MainReduxComponent);