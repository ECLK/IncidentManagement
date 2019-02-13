import thunkMiddleware from 'redux-thunk'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import landingReducer from '../modules/landing/state/LandingReducers'
import rootReducer from '../app/state/RootReducer'

const reducer = combineReducers({
    landingReducer,
    rootReducer
  })

const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware
    ));

export default store;
