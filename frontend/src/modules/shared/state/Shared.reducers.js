
import produce from "immer"

import {
    REQUEST_INCIDENT_CATAGORIES,
    REQUEST_INCIDENT_CATAGORIES_SUCCESS,
    REQUEST_INCIDENT_CATAGORIES_FAILURE,

    REQUEST_INCIDENT_DISTRICTS,
    REQUEST_INCIDENT_DISTRICTS_SUCCESS,
    REQUEST_INCIDENT_DISTRICTS_FAILURE,

    REQUEST_INCIDENT_POLICE_STATIONS,
    REQUEST_INCIDENT_POLICE_STATIONS_SUCCESS,
    REQUEST_INCIDENT_POLICE_STATIONS_FAILURE,

    REQUEST_INCIDENT_POLLING_STATIONS,
    REQUEST_INCIDENT_POLLING_STATIONS_SUCCESS,
    REQUEST_INCIDENT_POLLING_STATIONS_FAILURE,

    REQUEST_INCIDENT_WARDS,
    REQUEST_INCIDENT_WARDS_SUCCESS,
    REQUEST_INCIDENT_WARDS_FAILURE,

    ACTIVE_INCIDENT_GET_DATA_REQUEST,
    ACTIVE_INCIDENT_GET_DATA_SUCCESS,
    ACTIVE_INCIDENT_GET_DATA_ERROR,

    SIGN_IN_REQUEST,
    SIGN_IN_REQUEST_SUCCESS,
    SIGN_IN_REQUEST_ERROR,
} from './Shared.types'

const initialState = {
    categorys: [],
    provinces: [],
    districts: [],
    pollingStations: [],
    policeStations: [],
    wards: [],
    activeIncident:{
        isLoading:false,
        data: {
            id: 1
        },
        error:null
    },
    activeIncidentReporter:null,
    elections:{
        1:"General Election 2020",
        2:"Presedential Election 2020",
        3:"Presedential Election 2008"
    },
    signedInUser:{
        isLoading:false,
        isSignedIn:false,
        data:null,
        error:null
    }
}

export default function sharedReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState
    }
    return produce(state, draft => {
        switch (action.type) {            
            case REQUEST_INCIDENT_CATAGORIES:
                return draft
            case REQUEST_INCIDENT_CATAGORIES_SUCCESS:
                draft.categorys = action.data;
                return draft
            case REQUEST_INCIDENT_CATAGORIES_FAILURE:
                return draft

            case REQUEST_INCIDENT_DISTRICTS:
                return draft
            case REQUEST_INCIDENT_DISTRICTS_SUCCESS:
                draft.districts = action.data;
                draft.provinces = [...new Set(action.data.map(item => item.province))];
                return draft
            case REQUEST_INCIDENT_DISTRICTS_FAILURE:
                return draft

            case REQUEST_INCIDENT_POLICE_STATIONS:
                return draft
            case REQUEST_INCIDENT_POLICE_STATIONS_SUCCESS:
                draft.policeStations = action.data;
                return draft
            case REQUEST_INCIDENT_POLICE_STATIONS_FAILURE:
                return draft

            case REQUEST_INCIDENT_POLLING_STATIONS:
                return draft
            case REQUEST_INCIDENT_POLLING_STATIONS_SUCCESS:
                draft.pollingStations = action.data;
                return draft
            case REQUEST_INCIDENT_POLLING_STATIONS_FAILURE:
                return draft

            case REQUEST_INCIDENT_WARDS:
                return draft
            case REQUEST_INCIDENT_WARDS_SUCCESS:
                draft.wards = action.data;
                return draft
            case REQUEST_INCIDENT_WARDS_FAILURE:
                return draft

            case ACTIVE_INCIDENT_GET_DATA_REQUEST:
                draft.activeIncident.isLoading= true
                return draft
            case ACTIVE_INCIDENT_GET_DATA_SUCCESS:
                draft.activeIncident.data = action.data.incident
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
                if(action.data.authenticated){
                    draft.signedInUser.data = action.data.user
                    draft.signedInUser.isSignedIn = true;
                }
                draft.signedInUser.isLoading = false;
                return draft;
            case SIGN_IN_REQUEST_ERROR:
                draft.signedInUser.error = action.error;
        }
    })
}


