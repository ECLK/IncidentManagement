import React from 'react';
import { connect } from 'react-redux'

import {changeLanguage} from '../../app/state/RootActions'
import { Button } from '@material-ui/core';
import "./LanguageSelector.css";
function LangaugeSelector(props) {

    const selectLanguage = (lang) => {
        props.onClick(lang)
    }
    const { selectedLanguage } = props;

    return (
        <div className="language-selector">
            <Button variant="contained" color="default" onClick={()=>{selectLanguage('si')}} disabled={selectedLanguage === 'si'}>
                Sinhala
            </Button>
            <Button variant="contained" color="default" onClick={()=>{selectLanguage('ta')}} disabled={selectedLanguage === 'ta'}>
                Tamil
            </Button>
            <Button variant="contained" color="default" onClick={()=>{selectLanguage('en')}} disabled={selectedLanguage === 'en'}>
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
