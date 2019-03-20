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
    REQUEST_INCIDENT_CATAGORIES_FAILURE
} from './IncidentFiling.types'

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
        submitResponse
    }
}

export function recieveIncidentSubmitError(errorResponse) {
    return {
        type: INCIDENT_BASIC_DATA_SUBMIT_ERROR,
        errorResponse
    }
}

export function submitIncidentBasicData(incidentData) {
    return function (dispatch) {
        dispatch(requestIncidentSubmit());
        return postIncidentReport(incidentData)
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

// Get Catogories

export function requestIncidentCatogories() {
    return {
        type: REQUEST_INCIDENT_CATAGORIES,
    }
}

export function recieveIncidentCatogories(catogories) {
    return {
        type: REQUEST_INCIDENT_CATAGORIES_SUCCESS,
        catogories
    }
}

export function recieveIncidentCatogoriesError(errorResponse) {
    return {
        type: REQUEST_INCIDENT_CATAGORIES_FAILURE,
        errorResponse
    }
}

export function fetchCatogories(){
    return function(dispatch){
        dispatch(requestIncidentCatogories());
        return getIncidentCatogories()
        .then(
            response => response.data,
            error=> console.log('error occured', error)
        )
        .then(json =>
            dispatch(recieveIncidentCatogories(json))
        )
    }
}
