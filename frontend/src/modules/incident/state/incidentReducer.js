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

} from './incidentActions'


const initialState = {
    activeIncident: {
        data:null,
        isLoading:false,
        error:null
    }, //later move this to a incident object cache
    activeIncidentReporter: {
        data:null,
        isLoading:false,
        error:null
    },
}

export const incidentReducer = createReducer(initialState, {

    [loadGuestIncidentRequest] : (state, action) => {
        state.activeIncident.isLoading = true
    },
    [loadGuestIncidentSuccess] : (state, action) => {
        state.activeIncident.isLoading = false
        state.activeIncident.data = action.payload.data
    },
    [loadGuestIncidentError] : (state, action) => {
        state.activeIncident.error = action.payload.error
    },
    [updateGuestIncidentSuccess] : (state, action) => {
        state.activeIncident.data = action.payload.data
    },

    [loadGuestIncidentReporterRequest] : (state, action) => {
        state.activeIncidentReporter.isLoading = true
    },
    [loadGuestIncidentReporterSuccess] : (state, action) => {
        state.activeIncidentReporter.isLoading = false
        state.activeIncidentReporter.data = action.payload.data
    },
    [loadGuestIncidentReporterError] : (state, action) => {
        state.activeIncidentReporter.error = action.payload.error
    },
    [updateGuestIncidentReporterSuccess] : (state, action) => {
        state.activeIncidentReporter.data = action.payload.data
    },

})