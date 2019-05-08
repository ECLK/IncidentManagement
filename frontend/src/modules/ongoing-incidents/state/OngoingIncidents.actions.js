
import { 
    REQUEST_INCIDENT_EVENT_TRAIL, 
    REQUEST_INCIDENT_EVENT_TRAIL_SUCCESS, 
    REQUEST_INCIDENT_EVENT_TRAIL_FAILURE
} from './OngoingIncidents.types'

import { getEvents } from '../../../api/events'


export function requestIncidentEventTrail() {
    return {
        type: REQUEST_INCIDENT_EVENT_TRAIL,
    }
}

export function requestIncidentEventTrailSuccess(response) {
    return {
        type: REQUEST_INCIDENT_EVENT_TRAIL_SUCCESS,
        data: response,
        error: null
    }
}

export function requestIncidentEventTrailError(errorResponse) {
    return {
        type: REQUEST_INCIDENT_EVENT_TRAIL_FAILURE,
        data: null,
        error: errorResponse
    }
}

export function fetchIncidentEventTrail() {
    return async function(dispatch) {
        dispatch(requestIncidentEventTrail());
        try{
            const response = await getEvents();
            await dispatch(requestIncidentEventTrailSuccess(response.data));
        }catch(error){
            await dispatch(requestIncidentEventTrailError(error));
        }
    }
}