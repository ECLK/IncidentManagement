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
          <Switch>
            <Route exact path="/" component={SignInPage} />
            <Route exact path="/sign-in" component={SignInPage} />
            <PrivateRoute path="/report" component={Report} />        
            <PrivateRoute path="/ongoing" component={Ongoing}/>
            <PrivateRoute path="/historic" component={Historic}/>
            <PrivateRoute path="/home" component={LandingPage}/>
          </Switch>
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
