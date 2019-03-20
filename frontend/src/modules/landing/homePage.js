import React, { Component } from 'react';
import { connect } from 'react-redux'

import { fetchCatogories } from './state/LandingActions'
import { submitIncidentBasicData, requestIncidentUpdate, fetchUpdateIncident } from '../incident-filing/state/IncidentFiling.actions';

class LandingPage extends Component {

    render() {
        return (
            <React.Fragment>
                <div>Catogories</div>
                <div style={{ 'display': 'flex', 'justify-content': 'center', 'padding-top': '300px' }}>
                    <button onClick={() => { this.props.onClick() }}>getCats</button>
                    {this.props.isCatogoryFetching ? <p>"Loading"</p> : <p></p>}
                </div>
            </React.Fragment>

        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        isCatogoryFetching: state.landingReducer.isCatogoryFetching,
        ...ownProps
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => {
            dispatch(fetchUpdateIncident(12, {title: "new studf"}))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LandingPage);