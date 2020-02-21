import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createStore, applyMiddleware, combineReducers } from 'redux';

import sharedReducer from '../shared/state/Shared.reducers';
import modalReducer from '../modals/state/modal.reducers';
import { notificationReducer } 
        from '../notifications/state/notifications.reducers';

//new incidents reducer
import incidentReducer from '../incident/state/incidentReducer';
import guestViewReducer from '../guest-view/state/guestViewReducer';

import userReducer from '../user/state/userReducer';
import loadingReducer from '../loading-spinners/state/loadingSpinnerReducer'
import eventReducer from '../event/state/eventReducer';


const reducer = combineReducers({
    shared: sharedReducer,
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
