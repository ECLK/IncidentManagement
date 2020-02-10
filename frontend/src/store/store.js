import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createStore, applyMiddleware, combineReducers } from 'redux';

import sharedReducer from '../modules/shared/state/Shared.reducers';
import modalReducer from '../modules/modals/state/modal.reducers';
import { notificationReducer } 
        from '../modules/notifications/state/notifications.reducers';

//new incidents reducer
import incidentReducer from '../modules/incident/state/incidentReducer';
import guestViewReducer from '../modules/guest-view/state/guestViewReducer';

import userReducer from '../modules/user/state/userReducer';
import loadingReducer from '../modules/loading-spinners/state/loadingSpinnerReducer'
import eventReducer from '../modules/event/state/eventReducer';


const reducer = combineReducers({
    sharedReducer,
    modal: modalReducer,
    notification: notificationReducer,
    incident: incidentReducer,
    guestView: guestViewReducer,
    user: userReducer,
    loading: loadingReducer,
    event: eventReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
    applyMiddleware(
        thunkMiddleware
    ))
);

export default store;
