//Incident Reducers
import { createReducer } from 'redux-starter-kit';
import {
    createGuestIncidentRequest,
    createGuestIncidentSuccess,
    createGuestIncidentError,

    updateGuestIncidentRequest,
    updateGuestIncidentSuccess,
    updateGuestIncidentError,

    updateGuestIncidentReporterRequest,
    updateGuestIncidentReporterSuccess,
    updateGuestIncidentReporterError,

    loadGuestIncidentRequest,
    loadGuestIncidentSuccess,
    loadGuestIncidentError,

    resetIncidentState,

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

const incidentReducer = createReducer(initialState, {

    [createGuestIncidentSuccess] : (state, action) => {
        state.activeIncident.data = action.payload.data;
        state.activeIncidentReporter.data = {
            id:action.payload.data.reporter
        }
    },
    [updateGuestIncidentSuccess] : (state, action) => {
        state.activeIncident.data = action.payload.data
    },
    [updateGuestIncidentReporterSuccess] : (state, action) => {
        state.activeIncidentReporter.data = action.payload.data
    },
    [loadGuestIncidentRequest]: (state, action) => {
        state.activeIncident.isLoading = true;
    },
    [loadGuestIncidentError]: (state, action) => {
        state.activeIncident.isLoading = false;
        state.activeIncident.error = action.payload;
    },
    [resetIncidentState] : (state, action) => {
        state  = initialState
    }

})

export default incidentReducer;