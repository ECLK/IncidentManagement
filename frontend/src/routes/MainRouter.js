import React, { Component } from "react";
import { Route, BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import history from './history';

import { IntlProvider } from "react-intl";
import i18n from "../translation/i18n.js";
import LandingPage from "../modules/landing/LandingPage";
import Historic from "../modules/reporting";
import Report from "../modules/incident-filing";
import Ongoing from "../modules/ongoing-incidents";
import {SignInPage} from "../modules/shared";
import PrivateRoute from "./PrivateRoute";

import ReviewIncidentListView from '../modules/incident-filing/ReviewIncidentListView';
import DomainContainer from '../components/DomainContainer';
import { withStyles } from '@material-ui/core/styles';

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
                <PrivateRoute exact path="/app/ongoing" component={Ongoing}/>
                <PrivateRoute exact path="/app/historic" component={Historic}/>
                <PrivateRoute exact path="/app/home" component={LandingPage}/>

                <PrivateRoute exact path="/app/review" component={ReviewIncidentListView} />
              </Switch>
            </PrivateRoute>

          <Route exact path="/" component={SignInPage} />
          <Route path="/sign-in" component={SignInPage} />
          </div>
        </Router>
      </IntlProvider>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    selectedLanguage: state.rootReducer.selectedLanguage,
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
