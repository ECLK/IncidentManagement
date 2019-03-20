import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import history from './history'

import HomePage from "../modules/landing/homePage";
import { IntlProvider } from "react-intl";
import i18n from "../translation/i18n.js";
import LandingPage from "../modules/landing/LandingPage";
import Historic from "../modules/reporting";
import Report from "../modules/incident-filing";
import Ongoing from "../modules/ongoing-incidents";

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
          <React.Fragment>
            <Route exact path="/" component={LandingPage} />
            <Route path="/report" component={Report} />
            <Route path="/ongoing" component={Ongoing}/>
            <Route path="/historic" component={Historic}/>
            <Route exact path="/home" component={HomePage} />
          </React.Fragment>
        </Router>
      </IntlProvider>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    selectedLanguage: state.rootReducer.selectedLanguage
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainRouter);
