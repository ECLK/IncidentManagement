import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

import './App.css';
import store from '../store';
import MainRouter from '../routes/MainRouter';

import ErrorNotification from '../notifications/components/ErrorNotification';
import ConfirmNotification from '../notifications/components/ConfirmNotification';
import LoadingNotification from '../notifications/components/LoadingNotification';

class App extends Component {
  render() {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Provider store={store}>
          <ErrorNotification />
          <ConfirmNotification />
          <LoadingNotification />
            <MainRouter/>
        </Provider>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;