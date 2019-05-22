
import { 
    REQUEST_INCIDENT_EVENT_TRAIL, 
    REQUEST_INCIDENT_EVENT_TRAIL_SUCCESS, 
    REQUEST_INCIDENT_EVENT_TRAIL_ERROR,

    POST_INCIDENT_COMMENT,
    POST_INCIDENT_COMMENT_SUCCESS,
    POST_INCIDENT_COMMENT_ERROR,

    CHANGE_INCIDENT_STATUS,
    CHANGE_INCIDENT_STATUS_SUCCESS,
    CHANGE_INCIDENT_STATUS_ERROR,

    CHANGE_INCIDENT_SEVERITY,
    CHANGE_INCIDENT_SEVERITY_SUCCESS,
    CHANGE_INCIDENT_SEVERITY_ERROR
} from './OngoingIncidents.types'

import { getEvents } from '../../../api/events'
import { postComment } from '../../../api/comments'
import { changeStatus, changeSeverity } from '../../../api/incident';
import { fetchActiveIncidentData } from '../../shared/state/Shared.actions';


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

export function submitIncidentComment(incidentId, commentData) {
    return async function(dispatch) {
        dispatch(postIncidentComment());
        try{
            const response = await postComment(incidentId, commentData);
            dispatch(postIncidentCommentSuccess(response.data));
            dispatch(fetchIncidentEventTrail());
        }catch(error){
            dispatch(postIncidentCommentError(error));
        }
    }
}


export function changeIncidentStatus() {
    return {
        type: CHANGE_INCIDENT_STATUS,
    }
}

export function changeIncidentStatusSuccess(response) {
    return {
        type: CHANGE_INCIDENT_STATUS_SUCCESS,
        data: response,
        error: null
    }
}

export function changeIncidentStatusError(errorResponse) {
    return {
        type: CHANGE_INCIDENT_STATUS_ERROR,
        data: null,
        error: errorResponse
    }
}

export function setIncidentStatus(incidentId, status) {
    return async function(dispatch) {
        dispatch(changeIncidentStatus());
        try{
            const response = await changeStatus(incidentId, status);
            dispatch(changeIncidentStatusSuccess(response.data));
            dispatch(fetchActiveIncidentData(incidentId));
            dispatch(fetchIncidentEventTrail());
            /**
             * Todo: refresh the incident 
             */
        }catch(error){
            dispatch(changeIncidentStatusError(error));
        }
    }
}


export function changeIncidentSeverity() {
    return {
        type: CHANGE_INCIDENT_SEVERITY,
    }
}

export function changeIncidentSeveritySuccess(response) {
    return {
        type: CHANGE_INCIDENT_SEVERITY_SUCCESS,
        data: response,
        error: null
    }
}

export function changeIncidentSeverityError(errorResponse) {
    return {
        type: CHANGE_INCIDENT_SEVERITY_ERROR,
        data: null,
        error: errorResponse
    }
}

export function setIncidentSeverity(incidentId, severity) {
    return async function(dispatch) {
        dispatch(changeIncidentSeverity());
        try{
            const response = await changeSeverity(incidentId, severity);
            dispatch(changeIncidentSeveritySuccess(response.data));
            dispatch(fetchActiveIncidentData(incidentId));
            dispatch(fetchIncidentEventTrail());
            /**
             * Todo: refresh the incident 
             */
        }catch(error){
            dispatch(changeIncidentSeverityError(error));
        }
    }
}