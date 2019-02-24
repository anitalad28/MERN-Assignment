import React, { Component } from 'react';

class TableHeader extends Component {   
    render() {
        return <th>{this.props.header}</th>;
    }
}

export default TableHeader;