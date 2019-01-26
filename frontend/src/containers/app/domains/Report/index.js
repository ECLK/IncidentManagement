import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

class Report extends Component {

    render(){
        return(
            <div className='domain-container'>
                <Link to='/'>
                    Back
                </Link>
                <Typography variant="h3" gutterBottom>
                    <FormattedMessage
                        id='eclk.incident.management.report.incidents'
                        description='Report an Incident'
                        defaultMessage='Report an Incident'
                    />
                </Typography>
            </div>
        )
    }
}

export default Report;