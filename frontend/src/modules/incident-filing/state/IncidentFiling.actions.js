import {
    SUBMIT_INCIDENT,
    INCIDENT_BASIC_DATA_SUBMIT_REQUEST,
    INCIDENT_BASIC_DATA_SUBMIT_SUCCESS,
    INCIDENT_BASIC_DATA_SUBMIT_ERROR,
    INCIDENT_STEPPER_FORWARD,
    INCIDENT_STEPPER_BACKWARD,
    
    INCIDENT_BASIC_DATA_UPDATE_REQUEST,
    INCIDENT_BASIC_DATA_UPDATE_SUCCESS,
    INCIDENT_BASIC_DATA_UPDATE_ERROR,
    INCIDENT_REPORTER_UPDATE_REQUEST,
    INCIDENT_REPORTER_UPDATE_SUCCESS,
    INCIDENT_REPORTER_UPDATE_ERROR,

    INCIDENT_GET_DATA_REQUEST,
    INCIDENT_GET_DATA_SUCCESS,
    INCIDENT_GET_DATA_ERROR
} from './IncidentFiling.types'
import { createIncident, updateIncident, updateReporter, getIncident, getReporter } from '../../../api/incident';

import { getActiveIncidentDataSuccess, fetchActiveIncidentData } from '../../shared/state/Shared.actions'

import history from '../../../routes/history';

// Form Submission

export function stepForwardIncidentStepper() {
    return {
        type: INCIDENT_STEPPER_FORWARD,
    }
}

export function stepBackwardIncidentStepper() {
    return {
        type: INCIDENT_STEPPER_BACKWARD,
    }
}

export function requestIncidentSubmit() {
    return {
        type: INCIDENT_BASIC_DATA_SUBMIT_REQUEST,
    }
}

export function recieveIncidentSubmitSuccess(submitResponse) {
    history.replace({ ...history.location, pathname: `/app/report/${submitResponse.incident.id}`});

    return {
        type: INCIDENT_BASIC_DATA_SUBMIT_SUCCESS,
        data: submitResponse,
        error: null
    }
}

export function recieveIncidentSubmitError(errorResponse) {
    return {
        type: INCIDENT_BASIC_DATA_SUBMIT_ERROR,
        data: null,
        error: errorResponse
    }
}

export function submitIncidentBasicData(incidentData) {
    return async function(dispatch) {
        dispatch(requestIncidentSubmit());
        try{
            const response = await createIncident(incidentData);
            await dispatch(getActiveIncidentDataSuccess(response.data));
            await dispatch(recieveIncidentSubmitSuccess(response.data));
            await dispatch(stepForwardIncidentStepper());
        }catch(error){
            console.log(error);
            await dispatch(recieveIncidentSubmitError(error));
        }
    }
}

// Update incident

export function requestIncidentUpdate() {
    return {
        type: INCIDENT_BASIC_DATA_UPDATE_REQUEST,
    }
}

export function recieveIncidentUpdateSuccess(submitResponse) {
    return {
        type: INCIDENT_BASIC_DATA_UPDATE_SUCCESS,
        data: submitResponse,
        error: null
    }
}

export function recieveIncidentUpdateError(errorResponse) {
    return {
        type: INCIDENT_BASIC_DATA_UPDATE_ERROR,
        data: null,
        error: errorResponse
    }
}

export function fetchUpdateIncident(incidentId, incidentData) {
    return async function (dispatch) {
        dispatch(requestIncidentUpdate());
        try{
            const response = await updateIncident(incidentId, incidentData);
            await dispatch(recieveIncidentUpdateSuccess(response.data));
            await dispatch(stepForwardIncidentStepper());
        }catch(error){
            await dispatch(recieveIncidentUpdateError(error));
        }
    }
}

// Update reporter

export function requestReporterUpdate() {
    return {
        type: INCIDENT_REPORTER_UPDATE_REQUEST,
    }
}

export function recieveReporterUpdateSuccess(response) {
    return {
        type: INCIDENT_REPORTER_UPDATE_SUCCESS,
        data: response,
        error: null
    }
}

export function recieveReporterUpdateError(errorResponse) {
    return {
        type: INCIDENT_REPORTER_UPDATE_ERROR,
        data: null,
        error: errorResponse
    }
}

export function fetchUpdateReporter(incidentId, reporterId, reporterData) {
    return async function (dispatch) {
        dispatch(requestReporterUpdate());
        try{
            const response = await updateReporter(reporterId, reporterData);
            await dispatch(recieveReporterUpdateSuccess(response.data));
            await dispatch(fetchActiveIncidentData(incidentId));
            await dispatch(stepForwardIncidentStepper());
        }catch(error){
            await dispatch(recieveReporterUpdateError(error));
        }
    }
}

// get Incident

export function requestIncidentData() {
    return {
        type: INCIDENT_GET_DATA_REQUEST,
    }
}

export function getIncidentDataSuccess(response) {
    return {
        type: INCIDENT_GET_DATA_SUCCESS,
        data: response,
        error: null
    }
}

export function getIncidentDataError(errorResponse) {
    return {
        type: INCIDENT_GET_DATA_ERROR,
        data: null,
        error: errorResponse
    }
}

export function fetchIncidentData(incidentId) {
    return async function (dispatch) {
        dispatch(requestIncidentData(incidentId));
        try{
            const responseIncident = await getIncident(incidentId);
            const responseReporter = await getReporter(responseIncident.data.reporter_id);
            await dispatch(getIncidentDataSuccess({
                "incident": responseIncident.data,
                "reporter": responseReporter.data
            }));
        }catch(error){
            await dispatch(getIncidentDataError(error));
        }
    }
}



