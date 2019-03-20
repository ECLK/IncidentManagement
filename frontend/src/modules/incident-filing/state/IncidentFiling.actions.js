import { postIncidentReport, getIncidentCatogories } from '../../../api'
import {
    SUBMIT_INCIDENT,
    INCIDENT_BASIC_DATA_SUBMIT_REQUEST,
    INCIDENT_BASIC_DATA_SUBMIT_SUCCESS,
    INCIDENT_BASIC_DATA_SUBMIT_ERROR,
    INCIDENT_STEPPER_FORWARD,
    INCIDENT_STEPPER_BACKWARD,

    REQUEST_INCIDENT_CATAGORIES,
    REQUEST_INCIDENT_CATAGORIES_SUCCESS,
    REQUEST_INCIDENT_CATAGORIES_FAILURE,
    INCIDENT_BASIC_DATA_UPDATE_REQUEST,
    INCIDENT_BASIC_DATA_UPDATE_SUCCESS,
    INCIDENT_BASIC_DATA_UPDATE_ERROR
} from './IncidentFiling.types'
import { createIncident } from '../../../api/incident';

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
    return function (dispatch) {
        dispatch(requestIncidentSubmit());
        return createIncident(incidentData)
            .then(
                response => response.data,
                error => {
                    dispatch(recieveIncidentSubmitError(error))
                }
            )
            .then(json =>
                dispatch(recieveIncidentSubmitSuccess(json))
            ).then(()=>
                dispatch(stepForwardIncidentStepper())
            )
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

export function updateIncident(incidentData) {
    return function (dispatch) {
        dispatch(requestIncidentUpdate());
        return updateIncident(incidentData)
            .then(
                response => response.data,
                error => {
                    dispatch(recieveIncidentUpdateError(error))
                }
            )
            .then(json =>
                dispatch(recieveIncidentUpdateSuccess(json))
            )
    }
}



// Get Catogories

export function requestIncidentCatogories() {
    return {
        type: REQUEST_INCIDENT_CATAGORIES,
    }
}

export function recieveIncidentCatogories(catogories) {
    return {
        type: REQUEST_INCIDENT_CATAGORIES_SUCCESS,
        data: catogories,
        error: null
    }
}

export function recieveIncidentCatogoriesError(errorResponse) {
    return {
        type: REQUEST_INCIDENT_CATAGORIES_FAILURE,
        data: null,
        error: errorResponse
    }
}

export function fetchCatogories(){
    return function(dispatch){
        dispatch(requestIncidentCatogories());
        return getIncidentCatogories()
        .then(
            response => response.data
        )
        .then(json =>
            dispatch(recieveIncidentCatogories(json))
        )
    }
}
