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

const incidentReducer = createReducer(initialState, {

    [createGuestIncidentSuccess] : (state, action) => {
        state.activeIncident.data = action.payload.data;
        state.activeIncidentReporter.data = {
            id:action.payload.data.reporter
        }
    },
    [loadGuestIncidentSuccess] : (state, action) => {
        state.activeIncident.isLoading = false
        state.activeIncident.data = action.payload.data
    },
    [updateGuestIncidentSuccess] : (state, action) => {
        state.activeIncident.data = action.payload.data
    }

})

export default incidentReducer;