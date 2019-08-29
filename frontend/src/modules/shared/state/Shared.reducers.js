
import produce from "immer";
import axios from 'axios';
import * as localStorage from "../../../utils/localStorage"

import {

    REQUEST_INCIDENT_CHANNELS,
    REQUEST_INCIDENT_CHANNELS_SUCCESS,
    REQUEST_INCIDENT_CHANNELS_FAILURE,

    REQUEST_INCIDENT_ELECTIONS,
    REQUEST_INCIDENT_ELECTIONS_SUCCESS,
    REQUEST_INCIDENT_ELECTIONS_FAILURE,

    REQUEST_INCIDENT_CATAGORIES,
    REQUEST_INCIDENT_CATAGORIES_SUCCESS,
    REQUEST_INCIDENT_CATAGORIES_FAILURE,

    REQUEST_INCIDENT_PROVINCES,
    REQUEST_INCIDENT_PROVINCES_SUCCESS,
    REQUEST_INCIDENT_PROVINCES_FAILURE,

    REQUEST_INCIDENT_DISTRICTS,
    REQUEST_INCIDENT_DISTRICTS_SUCCESS,
    REQUEST_INCIDENT_DISTRICTS_FAILURE,

    REQUEST_INCIDENT_DIVISIONAL_SECRETARIATS,
    REQUEST_INCIDENT_DIVISIONAL_SECRETARIATS_SUCCESS,
    REQUEST_INCIDENT_DIVISIONAL_SECRETARIATS_FAILURE,

    REQUEST_INCIDENT_GRAMA_NILADHARIS,
    REQUEST_INCIDENT_GRAMA_NILADHARIS_SUCCESS,
    REQUEST_INCIDENT_GRAMA_NILADHARIS_FAILURE,

    REQUEST_INCIDENT_POLLING_STATIONS,
    REQUEST_INCIDENT_POLLING_STATIONS_SUCCESS,
    REQUEST_INCIDENT_POLLING_STATIONS_FAILURE,

    REQUEST_INCIDENT_POLLING_DIVISIONS,
    REQUEST_INCIDENT_POLLING_DIVISIONS_SUCCESS,
    REQUEST_INCIDENT_POLLING_DIVISIONS_FAILURE,

    REQUEST_INCIDENT_POLICE_STATIONS,
    REQUEST_INCIDENT_POLICE_STATIONS_SUCCESS,
    REQUEST_INCIDENT_POLICE_STATIONS_FAILURE,

    REQUEST_INCIDENT_POLICE_DIVISIONS,
    REQUEST_INCIDENT_POLICE_DIVISIONS_SUCCESS,
    REQUEST_INCIDENT_POLICE_DIVISIONS_FAILURE,

    REQUEST_INCIDENT_WARDS,
    REQUEST_INCIDENT_WARDS_SUCCESS,
    REQUEST_INCIDENT_WARDS_FAILURE,

    ACTIVE_INCIDENT_GET_DATA_REQUEST,
    ACTIVE_INCIDENT_GET_DATA_SUCCESS,
    ACTIVE_INCIDENT_GET_DATA_ERROR,

    SIGN_IN_REQUEST,
    SIGN_IN_REQUEST_SUCCESS,
    SIGN_IN_REQUEST_ERROR,

    TOGGLE_REMEBER_USER,
    SIGN_OUT,
    SIGN_OUT_ERROR,

    CHANGE_LANGUAGE,

    RESET_ACTIVE_INCIDENT,


} from './Shared.types'

const initialState = {
    channels: [],
    elections: [],
    categories: [],
    provinces: [],
    districts: [],
    divisionalSecretariats: [],
    gramaNiladharis: [],
    pollingDivisions: [],
    pollingStations: [],
    policeStations: [],
    policeDivisions: [],
    wards: [],

    activeIncident: {
        isLoading: false,
        data: {

        },
        error: null
    },
    activeIncidentReporter: null,
    signedInUser: {
        isLoading: false,
        isSignedIn: false,
        data: null,
        error: null,
        rememberMe: true,
    },
    selectedLanguage: 'en',
}

export default function sharedReducer(state, action) {
    if (typeof state === 'undefined') {
        let userData = localStorage.read("ECIncidentManagementUser");
        if (userData && userData.authenticated) {
            initialState.signedInUser.data = userData.user;
            initialState.signedInUser.isSignedIn = true;
            axios.defaults.headers.common['Authorization'] = "JWT " + userData.token;
        }
        return initialState;
    }
    
    return produce(state, draft => {
        switch (action.type) {

            case REQUEST_INCIDENT_CHANNELS:
                return draft
            case REQUEST_INCIDENT_CHANNELS_SUCCESS:
                draft.channels = action.data;
                return draft
            case REQUEST_INCIDENT_CHANNELS_FAILURE:
                return draft

            case REQUEST_INCIDENT_ELECTIONS:
                return draft
            case REQUEST_INCIDENT_ELECTIONS_SUCCESS:
                draft.elections = action.data;
                return draft
            case REQUEST_INCIDENT_ELECTIONS_FAILURE:
                return draft
                
            case REQUEST_INCIDENT_CATAGORIES:
                return draft
            case REQUEST_INCIDENT_CATAGORIES_SUCCESS:
                draft.categories = action.data;
                return draft
            case REQUEST_INCIDENT_CATAGORIES_FAILURE:
                return draft

            case REQUEST_INCIDENT_PROVINCES:
                return draft
            case REQUEST_INCIDENT_PROVINCES_SUCCESS:
                draft.provinces = action.data;
                return draft
            case REQUEST_INCIDENT_PROVINCES_FAILURE:
                return draft

            case REQUEST_INCIDENT_DISTRICTS:
                return draft
            case REQUEST_INCIDENT_DISTRICTS_SUCCESS:
                draft.districts = action.data;
                // draft.provinces = [...new Set(action.data.map(item => item.province))];
                return draft
            case REQUEST_INCIDENT_DISTRICTS_FAILURE:
                return draft

            case REQUEST_INCIDENT_DIVISIONAL_SECRETARIATS:
                return draft
            case REQUEST_INCIDENT_DIVISIONAL_SECRETARIATS_SUCCESS:
                draft.divisionalSecretariats = action.data;
                return draft
            case REQUEST_INCIDENT_DIVISIONAL_SECRETARIATS_FAILURE:
                return draft

            case REQUEST_INCIDENT_GRAMA_NILADHARIS:
                return draft
            case REQUEST_INCIDENT_GRAMA_NILADHARIS_SUCCESS:
                draft.gramaNiladharis = action.data;
                return draft
            case REQUEST_INCIDENT_GRAMA_NILADHARIS_FAILURE:
                return draft

            case REQUEST_INCIDENT_POLLING_STATIONS:
                return draft
            case REQUEST_INCIDENT_POLLING_STATIONS_SUCCESS:
                draft.pollingStations = action.data;
                return draft
            case REQUEST_INCIDENT_POLLING_STATIONS_FAILURE:
                return draft

            case REQUEST_INCIDENT_POLLING_DIVISIONS:
                return draft
            case REQUEST_INCIDENT_POLLING_DIVISIONS_SUCCESS:
                draft.pollingDivisions = action.data;
                return draft
            case REQUEST_INCIDENT_POLLING_DIVISIONS_FAILURE:
                return draft

            case REQUEST_INCIDENT_POLICE_STATIONS:
                return draft
            case REQUEST_INCIDENT_POLICE_STATIONS_SUCCESS:
                draft.policeStations = action.data;
                return draft
            case REQUEST_INCIDENT_POLICE_STATIONS_FAILURE:
                return draft

            case REQUEST_INCIDENT_POLICE_DIVISIONS:
                return draft
            case REQUEST_INCIDENT_POLICE_DIVISIONS_SUCCESS:
                draft.policeDivisions = action.data;
                return draft
            case REQUEST_INCIDENT_POLICE_DIVISIONS_FAILURE:
                return draft
    
            case REQUEST_INCIDENT_WARDS:
                return draft
            case REQUEST_INCIDENT_WARDS_SUCCESS:
                draft.wards = action.data;
                return draft
            case REQUEST_INCIDENT_WARDS_FAILURE:
                return draft
            case ACTIVE_INCIDENT_GET_DATA_REQUEST:
                draft.activeIncident.isLoading = true
                return draft
            case ACTIVE_INCIDENT_GET_DATA_SUCCESS:
                draft.activeIncident.data = action.data.incident
                draft.activeIncident.data.assignees = [draft.activeIncident.data.assignee]
                draft.activeIncidentReporter = action.data.reporter
                draft.activeIncident.isLoading = false
                return draft
            case ACTIVE_INCIDENT_GET_DATA_ERROR:
                draft.activeIncident.error = action.error
                return draft
            case SIGN_IN_REQUEST:
                draft.signedInUser.isLoading = true;
                return draft
            case SIGN_IN_REQUEST_SUCCESS:
                if (action.data.authenticated) {
                    draft.signedInUser.data = action.data.user
                    draft.signedInUser.isSignedIn = true;
                }
                draft.signedInUser.isLoading = false;
                return draft;
            case SIGN_IN_REQUEST_ERROR:
                draft.signedInUser.error = action.error;
                return draft;
            case TOGGLE_REMEBER_USER:
                draft.signedInUser.rememberMe = !state.signedInUser.rememberMe
                return draft;
            case SIGN_OUT:
                draft.signedInUser = {
                    isLoading: false,
                    isSignedIn: false,
                    data: null,
                    error: null,
                    rememberMe: true,
                }
                return draft;
            case SIGN_OUT_ERROR:
                return draft;
            case CHANGE_LANGUAGE:
                draft.selectedLanguage = action.selectedLanguage;
                return draft;
            case RESET_ACTIVE_INCIDENT:
                draft.activeIncident.data = {};
                draft.activeIncidentReporter = null;
                return draft;
        }
    });
}


