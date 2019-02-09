import React, { Component } from 'react';
import DomainContainer from '../../../../components/DomainContainer';
import { Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
class Historic extends Component {

    render(){
        return(<DomainContainer header={()=>
            <Typography variant="h5" color='inherit' noWrap className='line-height-fix'>
                <FormattedMessage
                    id='eclk.incident.management.historic.reports'
                    description='Historic Reports'
                    defaultMessage='Historic Reports'
                />
            </Typography>
        } />)
    }
}

export default Historic;