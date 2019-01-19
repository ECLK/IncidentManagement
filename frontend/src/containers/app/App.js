import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';
import mainStore from '../../store/mainStore';
import mainRoutes from '../../routes/mainRoutes'

class App extends Component {
  render() {
    return (
      <Provider store={mainStore}>
        <Router>
          <div>
            {mainRoutes.map((currRoute, key)=>{
              return (<Route exact path={currRoute.path} component={currRoute.component} key={key}/>)
            })}
          </div>
        </Router>
      </Provider>
      
    );
  }
}

export default App;
