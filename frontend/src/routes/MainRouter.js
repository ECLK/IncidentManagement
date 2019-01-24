import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

import LangaugeSelector from "../containers/landing/languageSelector";
import HomePage from "../containers/landing/homePage";
import { IntlProvider } from "react-intl";
import i18n from "../translation/i18n.js";

class MainRouter extends Component {
  constructor(props) {
    super(props);
  }

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
            <Route exact path="/" component={LangaugeSelector} />
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
