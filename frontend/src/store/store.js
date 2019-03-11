import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createStore, applyMiddleware, combineReducers } from 'redux'
import landingReducer from '../modules/landing/state/LandingReducers'
import rootReducer from '../app/state/RootReducer'
import incidentReducer from '../modules/incident-filing/state/IncidentFiling.reducers';


const reducer = combineReducers({
    landingReducer,
    rootReducer,
    incidentReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
    applyMiddleware(
        thunkMiddleware
    ))
);

export default store;
