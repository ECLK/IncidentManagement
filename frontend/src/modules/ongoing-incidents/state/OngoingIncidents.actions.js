
import { 
    REQUEST_INCIDENT_EVENT_TRAIL, 
    REQUEST_INCIDENT_EVENT_TRAIL_SUCCESS, 
    REQUEST_INCIDENT_EVENT_TRAIL_ERROR,

    POST_INCIDENT_COMMENT,
    POST_INCIDENT_COMMENT_SUCCESS,
    POST_INCIDENT_COMMENT_ERROR,
} from './OngoingIncidents.types'

import { getEvents } from '../../../api/events'
import { postComment } from '../../../api/comments'


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
        type: REQUEST_INCIDENT_EVENT_TRAIL_ERROR,
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


export function postIncidentComment() {
    return {
        type: POST_INCIDENT_COMMENT,
    }
}

export function postIncidentCommentSuccess(response) {
    return {
        type: POST_INCIDENT_COMMENT_SUCCESS,
        data: response,
        error: null
    }
}

export function postIncidentCommentError(errorResponse) {
    return {
        type: POST_INCIDENT_COMMENT_ERROR,
        data: null,
        error: errorResponse
    }
}

export function submitIncidentComment(commentData) {
    return async function(dispatch) {
        dispatch(postIncidentComment());
        try{
            const response = await postComment(commentData);
            dispatch(postIncidentCommentSuccess(response.data));
            dispatch(fetchIncidentEventTrail());
        }catch(error){
            dispatch(postIncidentCommentError(error));
        }
    }
}