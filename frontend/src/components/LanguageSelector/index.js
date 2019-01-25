import React, { Component } from 'react';
import { connect } from 'react-redux'

import {changeLanguage} from '../../actions'
import { Button } from '@material-ui/core';
import "./LanguageSelector.css";
function LangaugeSelector(props) {

    const selectLanguage = (lang) => {
        props.onClick(lang)
    }
    const { selectedLanguage } = props;

    return (
        <div className="language-selector">
            <Button variant="outlined" size="large" onClick={()=>{selectLanguage('si')}} className={selectedLanguage === 'si'? 'active' : ''}>
                Sinhala
            </Button>
            <Button variant="outlined" size="large" onClick={()=>{selectLanguage('ta')}} className={selectedLanguage === 'ta'? 'active' : ''}>
                Tamil
            </Button>
            <Button variant="outlined" size="large" onClick={()=>{selectLanguage('en')}} className={selectedLanguage === 'en'? 'active' : ''}>
                English
            </Button>
        </div>
    );
    
}

const mapStateToProps = (state, ownProps) => {
    return {
      selectedLanguage: state.selectedLanguage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      onClick: (lang) => {
        dispatch(changeLanguage(lang))
      }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LangaugeSelector);
