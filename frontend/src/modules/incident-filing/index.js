import React, { Component } from 'react';
import IncidentForm from './containers/IncidentForm';

class Report extends Component {
    render(){
        return (
            <IncidentForm paramIncidentId={this.props.match.params.paramIncidentId} />
        )
    }
}

export default Report;
