import React, { Component } from 'react';

class Options extends Component {
    render(){
        return(
            <option key={this.props.data} value={this.props.data}>{this.props.data}</option>
        );
    }
}

export default Options;