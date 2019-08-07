import React, { Component } from "react";
import { Route, BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import history from './history';

import { IntlProvider } from "react-intl";
import i18n from "../translation/i18n.js";
import Historic from "../modules/reporting";
import {Report} from "../modules/incident-filing";
import IncidentFormInternal from "../modules/incident-filing/components/IncidentFormInternal";
import {Ongoing} from "../modules/ongoing-incidents";
import {SignInPage} from "../modules/shared";
import PrivateRoute from "./PrivateRoute";

import {ReviewIncidentListView} from '../modules/ongoing-incidents';
import DomainContainer from '../modules/shared/components/DomainContainer';

import { LandingPage } from '../modules/guest-view';

import { Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

class Layout extends React.Component{
  
  render () {    
    return (
      <DomainContainer
          header={() =>
              <Typography variant="h5" color='inherit' noWrap className='line-height-fix'>
                  <FormattedMessage
                      id='eclk.incident.management.report.incidents'
                      description='Report an Incident'
                      defaultMessage='Report an Incident'
                  />
              </Typography>
          }
          content={this.props.children}
      />
    )
  }
}

class MainRouter extends Component {
  render() {
    let { selectedLanguage } = this.props;

    return (
      <IntlProvider
        locale={selectedLanguage}
        key={selectedLanguage}
        messages={i18n.translationMessages[selectedLanguage]}
      > 
        <Router history={history}>
          <div>
            <PrivateRoute path="/app" component={Layout}>
              <Switch>
                <PrivateRoute exact path="/app/report" component={Report} /> 
                <PrivateRoute exact path="/app/report2" component={ IncidentFormInternal } /> 
                <PrivateRoute exact path="/app/report/:paramIncidentId" component={Report} /> 

                <PrivateRoute exact path="/app/ongoing" component={Ongoing}/>
                <PrivateRoute exact path="/app/historic" component={Historic}/>

                <PrivateRoute exact path="/app/review" component={ReviewIncidentListView} />
                <PrivateRoute exact path="/app/review/:paramIncidentId" component={Ongoing} />
                <PrivateRoute exact path="/app/review/:paramIncidentId/edit" component={Report} />
              </Switch>
            </PrivateRoute>

          <Route exact path="/" component={LandingPage} />
          <Route path="/sign-in" component={SignInPage} />
          <Route path="/report" component={Report} />
          </div>
        </Router>
      </IntlProvider>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    selectedLanguage: state.sharedReducer.selectedLanguage,
    ...ownProps
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainRouter);
