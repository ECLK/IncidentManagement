
import produce from "immer";
import axios from 'axios';
import * as localStorage from "../../utils/localStorage"

import {

    REQUEST_INCIDENT_CHANNELS,
    REQUEST_INCIDENT_CHANNELS_SUCCESS,
    REQUEST_INCIDENT_CHANNELS_FAILURE,

    REQUEST_INCIDENT_ELECTIONS,
    REQUEST_INCIDENT_ELECTIONS_SUCCESS,
    REQUEST_INCIDENT_ELECTIONS_FAILURE,

    REQUEST_INCIDENT_INSTITUTIONS,
    REQUEST_INCIDENT_INSTITUTIONS_SUCCESS,
    REQUEST_INCIDENT_INSTITUTIONS_FAILURE,

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

    SIGN_IN_REQUEST,
    SIGN_IN_REQUEST_SUCCESS,
    SIGN_IN_REQUEST_ERROR,

    TOGGLE_REMEBER_USER,
    SIGN_OUT,
    SIGN_OUT_ERROR,

    CHANGE_LANGUAGE,

    RESET_ACTIVE_INCIDENT,

    REQUEST_INCIDENT_POLITICAL_PARTIES,
    REQUEST_INCIDENT_POLITICAL_PARTIES_SUCCESS,
    REQUEST_INCIDENT_POLITICAL_PARTIES_FAILURE

} from './Shared.types';


// transforms arrays from backend to objects.
// this helps to maintain better state shape.

const transformArray = (array) => {
    let transformedData = {
        byCode: {},
        allCodes : []
    };
    array.reduce((accumulator, currValue) => {
        transformedData.byCode[currValue.code] = currValue;
        transformedData.allCodes.push(currValue.code);
    },0)
    return transformedData;
}

const initialState = {
    channels: [],
    elections: [],
    categories: [],
    institutions: {
        byCode:{},
        allCodes:[]
    },
    provinces: {
        byCode:{},
        allCodes:[]
    },
    districts: {
        byCode:{},
        allCodes:[]
    },
    divisionalSecretariats: {
        byCode:{},
        allCodes:[]
    },
    gramaNiladharis: {
        byCode:{},
        allCodes:[]
    },
    pollingDivisions: {
        byCode:{},
        allCodes:[]
    },
    pollingStations: {
        byCode:{},
        allCodes:[]
    },
    policeStations: {
        byCode:{},
        allCodes:[]
    },
    policeDivisions: {
        byCode:{},
        allCodes:[]
    },
    wards: [],
    politicalParties: {
        byCode:{},
        allCodes:[]
    },

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

            case REQUEST_INCIDENT_INSTITUTIONS:
                return draft
            case REQUEST_INCIDENT_INSTITUTIONS_SUCCESS:
                draft.institutions = transformArray(action.data);
                return draft
            case REQUEST_INCIDENT_INSTITUTIONS_FAILURE:
                return draft

            case REQUEST_INCIDENT_PROVINCES:
                return draft
            case REQUEST_INCIDENT_PROVINCES_SUCCESS:
                draft.provinces = transformArray(action.data);
                return draft
            case REQUEST_INCIDENT_PROVINCES_FAILURE:
                return draft

            case REQUEST_INCIDENT_DISTRICTS:
                return draft
            case REQUEST_INCIDENT_DISTRICTS_SUCCESS:
                draft.districts = transformArray(action.data);
                return draft
            case REQUEST_INCIDENT_DISTRICTS_FAILURE:
                return draft

            case REQUEST_INCIDENT_DIVISIONAL_SECRETARIATS:
                return draft
            case REQUEST_INCIDENT_DIVISIONAL_SECRETARIATS_SUCCESS:
                draft.divisionalSecretariats = transformArray(action.data);
                return draft
            case REQUEST_INCIDENT_DIVISIONAL_SECRETARIATS_FAILURE:
                return draft

            case REQUEST_INCIDENT_GRAMA_NILADHARIS:
                return draft
            case REQUEST_INCIDENT_GRAMA_NILADHARIS_SUCCESS:
                draft.gramaNiladharis = transformArray(action.data);
                return draft
            case REQUEST_INCIDENT_GRAMA_NILADHARIS_FAILURE:
                return draft

            case REQUEST_INCIDENT_POLLING_STATIONS:
                return draft
            case REQUEST_INCIDENT_POLLING_STATIONS_SUCCESS:
                draft.pollingStations = transformArray(action.data);
                return draft
            case REQUEST_INCIDENT_POLLING_STATIONS_FAILURE:
                return draft

            case REQUEST_INCIDENT_POLLING_DIVISIONS:
                return draft
            case REQUEST_INCIDENT_POLLING_DIVISIONS_SUCCESS:
                draft.pollingDivisions = transformArray(action.data);
                return draft
            case REQUEST_INCIDENT_POLLING_DIVISIONS_FAILURE:
                return draft

            case REQUEST_INCIDENT_POLICE_STATIONS:
                return draft
            case REQUEST_INCIDENT_POLICE_STATIONS_SUCCESS:
                draft.policeStations = transformArray(action.data);
                return draft
            case REQUEST_INCIDENT_POLICE_STATIONS_FAILURE:
                return draft

            case REQUEST_INCIDENT_POLICE_DIVISIONS:
                return draft
            case REQUEST_INCIDENT_POLICE_DIVISIONS_SUCCESS:
                draft.policeDivisions = transformArray(action.data);
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

            case REQUEST_INCIDENT_POLITICAL_PARTIES:
                return draft
            case REQUEST_INCIDENT_POLITICAL_PARTIES_SUCCESS:
                draft.politicalParties = transformArray(action.data);
                return draft
            case REQUEST_INCIDENT_POLITICAL_PARTIES_FAILURE:
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
                // draft.activeIncident.data = {};
                // draft.activeIncidentReporter = null;
                return draft;
        }
    });
}


