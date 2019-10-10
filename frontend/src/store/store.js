import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import incidentReducer from '../modules/incident-filing/state/IncidentFiling.reducers';
import ongoingIncidentReducer from '../modules/ongoing-incidents/state/OngoingIncidents.reducers';

import sharedReducer from '../modules/shared/state/Shared.reducers';
import modalReducer from '../modules/modals/state/modal.reducers';
import { notificationReducer } 
        from '../modules/notifications/state/notifications.reducers';

//new incidents reducer
import newIncidentReducer from '../modules/incident/state/incidentReducer';
import guestViewReducer from '../modules/guest-view/state/guestViewReducer';

import userReducer from '../modules/user/state/userReducer'


const reducer = combineReducers({
    incidentReducer,
    sharedReducer,
    ongoingIncidentReducer,
    modalReducer,
    notificationReducer,
    incident:newIncidentReducer,
    guestView:guestViewReducer,
    user:userReducer,
})

const store = createStore(
    reducer,
    composeWithDevTools(
    applyMiddleware(
        thunkMiddleware
    ))
);

export default store;
