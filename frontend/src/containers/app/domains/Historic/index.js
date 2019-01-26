import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

class Historic extends Component {

    render(){
        return(
            <div className='domain-container'>
                <Link to='/'>
                    Back
                </Link>
                <Typography variant="h3" gutterBottom>
                    <FormattedMessage
                        id='eclk.incident.management.historic.reports'
                        description='Historic Reports'
                        defaultMessage='Historic Reports'
                    />
                </Typography>
            </div>
        )
    }
}

export default Historic;