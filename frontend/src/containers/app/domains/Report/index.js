import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import DomainContainer from '../../../../components/DomainContainer';

class Report extends Component {

    render(){
        return(<DomainContainer header={()=>
            <Typography variant="h5" color='inherit' noWrap className='line-height-fix'>
                <FormattedMessage
                    id='eclk.incident.management.report.incidents'
                    description='Report an Incident'
                    defaultMessage='Report an Incident'
                />
            </Typography>
        } />)
    }
}

export default Report;