import React, { Component } from 'react';
import { connect } from 'react-redux'

import Typography from '@material-ui/core/Typography';
import {FormattedMessage} from 'react-intl';
import {changeLanguage} from '../../actions'

class LangaugeSelector extends Component {

    selectLanguage(lang){
        this.props.onClick(lang)
    }

    render() {
        return (
            <div>
                <div className="title-container">
                    <Typography variant="h2" gutterBottom>
                        <FormattedMessage
                            id='eclk.incident.management.incidents'
                            description='Incidents'
                            defaultMessage='DefaultIncidents'
                        />
                    </Typography>
                </div>
                
                <div style={{'display':'flex','justify-content':'center','padding-top':'300px'}}>Select Language</div>
                <div style={{'display':'flex','justify-content':'center'}}>Selected: {this.props.selectedLanguage}</div>
                <div style={{'display':'flex','justify-content':'center', 'align-items':'center', 'padding-top':'100px'}}>
                <div style={{'display':'flex','justify-content':'space-around', 'width':'300px'}}>
                    <button onClick={()=>{this.selectLanguage('si')}}>Sinhala</button>
                    <button onClick={()=>{this.selectLanguage('en')}}>English</button>
                    <button onClick={()=>{this.selectLanguage('ta')}}>Tamil</button>
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
