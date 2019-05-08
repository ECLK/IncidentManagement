
import { 
    REQUEST_INCIDENT_COMMENT_TRAIL, 
    REQUEST_INCIDENT_COMMENT_TRAIL_SUCCESS, 
    REQUEST_INCIDENT_COMMENT_TRAIL_FAILURE
} from './OngoingIncidents.types'

import { getComments } from '../../../api/comments'


export function requestIncidentCommentTrail() {
    return {
        type: REQUEST_INCIDENT_COMMENT_TRAIL,
    }
}

export function requestIncidentCommentTrailSuccess(response) {
    return {
        type: REQUEST_INCIDENT_COMMENT_TRAIL_SUCCESS,
        data: response,
        error: null
    }
}

export function requestIncidentCommentTrailError(errorResponse) {
    return {
        type: REQUEST_INCIDENT_COMMENT_TRAIL_FAILURE,
        data: null,
        error: errorResponse
    }
}

export function fetchIncidentCommentTrail(incidentData) {
    return async function(dispatch) {
        dispatch(requestIncidentCommentTrail());
        try{
            const response = await getComments(incidentData);
            await dispatch(requestIncidentCommentTrailSuccess(response.data));
        }catch(error){
            await dispatch(requestIncidentCommentTrailError(error));
        }
    }
}