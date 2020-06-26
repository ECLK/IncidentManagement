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
    loadIncident,
    loadIncidentSuccess,
    loadAllIncidentsSuccess,
    updateIncidentSearchFilter,

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
    incidents : {
        byIds:{},
        allIds:[],
        paging: {
            pages: 1,
            pageNumber: 1,
            count: 0
        },
        searchFilter: {
            textSearch: "",
            incidentType: "",
            status: "",
            maxResponseTime: "",
            severity: "",
            category: "",
            startTime: null,
            endTime: null
        }
    },
    reporters: {
        byIds: {},
        allIds: []
    }
};

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
        state.activeIncident = {
            data:null,
            isLoading:false,
            error:null
        }
        state.activeIncidentReporter = {
            data:null,
            isLoading:false,
            error:null
        }
    },
    [loadIncidentSuccess] : (state, action) => {
        const { incident, reporter } = action.payload;
        
        if(!state.incidents.byIds[incident.id]){
            state.incidents.allIds.push(incident.id);
        }
        state.incidents.byIds[incident.id] = incident;

        if(!state.reporters.byIds[reporter.id]){
            state.reporters.allIds.push(reporter.id);
        }
        state.reporters.byIds[reporter.id] = reporter;
    },
    [loadAllIncidentsSuccess] : (state, action) => {
        const { incidents, pageNumber, pages, count } = action.payload;

        state.incidents.paging = {
            pageNumber,
            pages,
            count
        };

        const _byIds = {};
        const _allIds = [];

        for(var incident of incidents){
            _byIds[incident.id] = incident;
            _allIds.push(incident.id);
        }

        state.incidents.byIds = _byIds;
        state.incidents.allIds = _allIds;
    },
    [updateIncidentSearchFilter] : (state, action) => {
        state.incidents.searchFilter = action.payload;
    }

});

export default incidentReducer;