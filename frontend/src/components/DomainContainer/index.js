import React, { Component } from 'react';
import { AppBar } from '@material-ui/core';
import "./Domains.css";
import Link from 'react-router-dom/Link';
import LanguageSelector from '../LanguageSelector';
import Logo from '../Logo';

class DomainContainer extends Component {

    render(){
        return(
            <div className='domain-container'>
                <AppBar position="static" >
                    <div className='header-bar'>
                        <div className='header-icon-container'>
                            <Link to='/'>
                                <Logo maxWidth={'220px'}/>
                            </Link>
                        </div>
                        <div className='header-title-container'>
                            {this.props.header? this.props.header() : ''}
                        </div>
                        <div className='header-lang-select-container'>
                            <LanguageSelector />
                        </div>
                    </div>
                </AppBar>
                
                <div className='page-content'>
                    <div className='side-bar'>
                        {this.props.sidebar ? this.props.sidebar() : ''}
                    </div>
                    <div className='content'>
                        {this.props.content ? this.props.content() : ''}
                    </div>
                </div>
            </div>
        )
    }
}

export default DomainContainer;