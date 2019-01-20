import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router} from 'react-router-dom'

import './App.css';
import store from '../../store';
import routes from '../../routes'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            {routes.map((route, key)=>{
              return (route);
            })}
          </div>
        </Router>
      </Provider>
      
    );
  }
}

export default App;
