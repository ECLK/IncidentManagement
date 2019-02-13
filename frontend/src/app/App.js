import React, { Component } from 'react';
import { Provider } from 'react-redux'

import './App.css';
import store from '../store';
import MainRouter from '../routes/MainRouter';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <MainRouter/>
      </Provider>
    );
  }
}

export default App;