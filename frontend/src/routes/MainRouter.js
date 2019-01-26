import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

import HomePage from "../containers/landing/homePage";
import { IntlProvider } from "react-intl";
import i18n from "../translation/i18n.js";
import LandingPage from "../containers/landing/LandingPage";
import LanguageSelector from "../components/LanguageSelector";
import Historic from "../containers/app/domains/Historic";
import Report from "../containers/app/domains/Report";
import Ongoing from "../containers/app/domains/Ongoing";

class MainRouter extends Component {

  render() {
    let { selectedLanguage } = this.props;
    return (
      <IntlProvider
        locale={selectedLanguage}
        key={selectedLanguage}
        messages={i18n.translationMessages[selectedLanguage]}
      > 
        <Router>
          <React.Fragment>
            <LanguageSelector/>
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
    selectedLanguage: state.selectedLanguage
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainRouter);
