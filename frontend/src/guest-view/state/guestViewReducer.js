//Incident Reducers
import { createReducer } from 'redux-starter-kit';
import {
    createGuestIncidentRequest,
    createGuestIncidentSuccess,
    createGuestIncidentError,

    loadGuestIncidentRequest,
    loadGuestIncidentSuccess,
    loadGuestIncidentError,

    updateGuestIncidentRequest,
    updateGuestIncidentSuccess,
    updateGuestIncidentError,

    loadGuestIncidentReporterRequest,
    loadGuestIncidentReporterSuccess,
    loadGuestIncidentReporterError,

    updateGuestIncidentReporterRequest,
    updateGuestIncidentReporterSuccess,
    updateGuestIncidentReporterError,

    uploadFileGuestSuccess,

} from '../../incident/state/incidentActions'

import {
    moveStepper,
} from './guestViewActions'


const initialState = {
    isLoading: false,
    activeStep: 0,
}

const incidentReducer = createReducer(initialState, {

    [createGuestIncidentRequest] : (state, action) => {
        state.isLoading = true;
    },
    [createGuestIncidentSuccess] : (state, action) => {
        state.activeStep = 1;
        state.isLoading = false;
    },
    [updateGuestIncidentRequest] : (state, action) => {
        state.isLoading = true;
    },
    [updateGuestIncidentSuccess] : (state, action) => {
        state.activeStep = state.activeStep + 1;
        state.isLoading = false;
    },
    [updateGuestIncidentReporterRequest] : (state, action) => {
        state.isLoading = true;
    },
    [updateGuestIncidentReporterSuccess] : (state, action) => {
        state.activeStep = state.activeStep + 1;
        state.isLoading = false;
    },
    [uploadFileGuestSuccess] : (state, action) => {
        state.activeStep = state.activeStep + 1;
        state.isLoading = false;
    },
    [moveStepper]  : (state, action) => {
        state.activeStep = action.payload.step
    },

})

export default incidentReducer;