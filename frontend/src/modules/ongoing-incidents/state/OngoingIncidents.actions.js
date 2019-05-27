
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
    CHANGE_INCIDENT_SEVERITY_ERROR,

    RESOLVE_EVENT_APPROVAL,
    RESOLVE_EVENT_APPROVAL_SUCCESS,
    RESOLVE_EVENT_APPROVAL_ERROR,

    REQUEST_ALL_INCIDENTS, 
    REQUEST_ALL_INCIDENTS_SUCCESS, 
    REQUEST_ALL_INCIDENTS_ERROR,

    REQUEST_ALL_USERS,
    REQUEST_ALL_USERS_SUCCESS,
    REQUEST_ALL_USERS_ERROR,

    UPDATE_INCIDENT_ASSIGNEE,
    UPDATE_INCIDENT_ASSIGNEE_SUCCESS,
    UPDATE_INCIDENT_ASSIGNEE_ERROR
} from './OngoingIncidents.types'

import { getEvents, updateEventApproval } from '../../../api/events'
import { postComment } from '../../../api/comments'
import { changeStatus, changeSeverity, getIncidents, assignToIncident, removeFromIncident } from '../../../api/incident';
import { getAllUsers } from '../../../api/user';

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


export function resolveEventApproval() {
    return {
        type: RESOLVE_EVENT_APPROVAL,
    }
}

export function resolveEventApprovalSuccess(response) {
    return {
        type: RESOLVE_EVENT_APPROVAL_SUCCESS,
        data: response,
        error: null
    }
}

export function resolveEventApprovalError(errorResponse) {
    return {
        type: RESOLVE_EVENT_APPROVAL_ERROR,
        data: null,
        error: errorResponse
    }
}

export function resolveEvent(incidentId, eventId, decision) {
    return async function(dispatch) {
        dispatch(resolveEventApproval());
        try{
            const response = await updateEventApproval(eventId, decision);
            dispatch(resolveEventApprovalSuccess(response.data));
            dispatch(fetchActiveIncidentData(incidentId));
            dispatch(fetchIncidentEventTrail());
            /**
             * Todo: refresh the incident 
             */
        }catch(error){
            console.log(error);
            dispatch(resolveEventApprovalError(error));
        }
    }
}


export function requestAllIncidents() {
    return {
        type: REQUEST_ALL_INCIDENTS,
    }
}

export function requestAllIncidentsSuccess(response) {
    return {
        type: REQUEST_ALL_INCIDENTS_SUCCESS,
        data: response,
        error: null
    }
}

export function requestAllIncidentsError(errorResponse) {
    return {
        type: REQUEST_ALL_INCIDENTS_ERROR,
        data: null,
        error: errorResponse
    }
}

export function fetchAllIncidents(filters={}) {
    return async function(dispatch) {
        dispatch(requestAllIncidents());
        try{
            const response = await getIncidents(filters);
            dispatch(requestAllIncidentsSuccess(response.data));
        }catch(error){
            dispatch(requestAllIncidentsError(error));
        }
    }
}


export function requestAllUsers() {
    return {
        type: REQUEST_ALL_USERS,
    }
}

export function requestAllUsersSuccess(response) {
    return {
        type: REQUEST_ALL_USERS_SUCCESS,
        data: response,
        error: null
    }
}

export function requestAllUsersError(errorResponse) {
    return {
        type: REQUEST_ALL_USERS_ERROR,
        data: null,
        error: errorResponse
    }
}

export function fetchAllUsers() {
    return async function(dispatch) {
        dispatch(requestAllUsers());
        try{
            const response = await getAllUsers();
            dispatch(requestAllUsersSuccess(response.data));
        }catch(error){
            dispatch(requestAllUsersError(error));
        }
    }
}


export function updateIncidentAssignee() {
    return {
        type: UPDATE_INCIDENT_ASSIGNEE,
    }
}

export function updateIncidentAssigneeSuccess(response) {
    return {
        type: UPDATE_INCIDENT_ASSIGNEE_SUCCESS,
        data: response,
        error: null
    }
}

export function updateIncidentAssigneeError(errorResponse) {
    return {
        type: UPDATE_INCIDENT_ASSIGNEE_ERROR,
        data: null,
        error: errorResponse
    }
}

export function setIncidentAssignee(incidentId, uid, actionType) {
    return async function(dispatch) {
        dispatch(updateIncidentAssignee());
        try{
            let response;
            if(actionType === "ADD"){
                response = await assignToIncident(incidentId, uid);
            }else if(actionType === "REMOVE"){
                response = await removeFromIncident(incidentId, uid);
            }else{
                throw "Invalid action";
            }
            dispatch(updateIncidentAssigneeSuccess(response.data));
            dispatch(fetchActiveIncidentData(incidentId));
            dispatch(fetchIncidentEventTrail());
        }catch(error){
            dispatch(updateIncidentAssigneeError(error));
        }
    }
}