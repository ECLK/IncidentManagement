import React, { Component } from 'react';
import DomainContainer from '../../components/DomainContainer';
import { FormattedMessage } from 'react-intl';
import { Typography } from '@material-ui/core';
class Ongoing extends Component {

    render(){
        return(<DomainContainer header={()=>
            <Typography variant="h5" color='inherit' noWrap className='line-height-fix'>
                <FormattedMessage
                    id='eclk.incident.management.ongoing.incidents'
                    description='Ongoing Incidents'
                    defaultMessage='Ongoing Incidents'
                />
            </Typography>
        } />)
    }
}

export default Ongoing;