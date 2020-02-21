import React, { Component } from "react";
import { Route, Router, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { history } from './history';

import { IntlProvider } from "react-intl";
import i18n from "../translation/i18n.js";

import IncidentFormInternal from "../incident-filing/components/IncidentFormInternal";

import { ReportList, ReportViewer } from "../reporting";

import {SignInPage} from "../shared";
import PrivateRoute from "./PrivateRoute";

import {ReviewIncidentListView} from '../ongoing-incidents';
import DomainContainer from '../shared/components/DomainContainer';

import { LandingPage } from '../guest-view';

import { Home } from "../home";
import GuestIncidentForm from '../guest-view/components/GuestIncidentForm'
import IncidentView from "../ongoing-incidents/components/IncidentView";
import ArchiveIncidentListView from "../ongoing-incidents/components/ArchiveIncidentListView";
import GuestIncidentFormSuccessPage from "../guest-view/components/GuestFormSuccessPage"


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
            <PrivateRoute path="/app" component={DomainContainer}>
              <Switch>
                <PrivateRoute exact path="/app/home" component={Home} /> 
                <PrivateRoute exact path="/app/reports" component={ReportList} /> 
                <PrivateRoute exact path="/app/reports/view" component={ReportViewer} /> 
                <PrivateRoute exact path="/app/create" component={IncidentFormInternal} />
                <PrivateRoute exact path="/app/review" component={ReviewIncidentListView} />
                <PrivateRoute exact path="/app/review/:paramIncidentId" component={IncidentView} />
                <PrivateRoute exact path="/app/review/:paramIncidentId/edit" component={IncidentFormInternal} />
                <PrivateRoute exact path="/app/archive" component={ArchiveIncidentListView} />
              </Switch>
            </PrivateRoute>

          <Route exact path="/" component={LandingPage} />
          <Route path="/sign-in" component={SignInPage} />
          <Route exact path="/report" component={GuestIncidentForm} />
          <Route exact path="/report/success" component={GuestIncidentFormSuccessPage} />
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
