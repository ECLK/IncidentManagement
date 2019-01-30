import React, { Component } from 'react';
import { Typography, AppBar } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import "../Domains.css";
import LanguageSelector from '../../../../components/LanguageSelector';
import Logo from '../../../../components/Logo';

class Historic extends Component {

    render(){
        return(
            <React.Fragment>
                <div className='domain-container'>
                    <AppBar position="static" >
                        <div className='header-bar'>
                            <div className='header-icon-container'>
                                <Logo maxWidth={'220px'}/>
                            </div>
                            <div className='header-title-container'>
                                <Typography variant="h5" color='inherit' noWrap>
                                    <FormattedMessage
                                        id='eclk.incident.management.historic.reports'
                                        description='Historic Reports'
                                        defaultMessage='Historic Reports'
                                    />
                                </Typography>
                            </div>
                            <div className='header-lang-select-container'>
                                <LanguageSelector />
                            </div>
                        </div>
                    </AppBar>
                    
                    <div className='page-content'>
                        <div className='side-bar'></div>
                        <div className='content'></div>
                    </div>
                    
                    
                    {/* <Link to='/'>
                        Back
                    </Link>
                    <Typography variant="h3" gutterBottom>
                        <FormattedMessage
                            id='eclk.incident.management.historic.reports'
                            description='Historic Reports'
                            defaultMessage='Historic Reports'
                        />
                    </Typography> */}
                </div>
            </React.Fragment>
            
        )
    }
}

export default Historic;