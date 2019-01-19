import React, { Component } from 'react';
import { connect } from 'react-redux'

import {changeLanguage} from '../../actions/mainActions'

class LangaugeSelector extends Component {

    selectLanguage(lang){
        this.props.onClick(lang)
    }

    render() {
        return (
            <div>
            <div style={{'display':'flex','justify-content':'center','padding-top':'300px'}}>Select Language</div>
            <div style={{'display':'flex','justify-content':'center'}}>Selected: {this.props.selectedLanguage}</div>
            <div style={{'display':'flex','justify-content':'center', 'align-items':'center', 'padding-top':'100px'}}>
            <div style={{'display':'flex','justify-content':'space-around', 'width':'300px'}}>
                <button onClick={()=>{this.selectLanguage('sinhala')}}>Sinhala</button>
                <button onClick={()=>{this.selectLanguage('english')}}>English</button>
                <button onClick={()=>{this.selectLanguage('tamil')}}>Tamil</button>
            </div>         
            </div>
            </div>
        );
    }
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
