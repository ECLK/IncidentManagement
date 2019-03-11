import { postIncidentReport } from '../../../api'
import {
    SUBMIT_INCIDENT,
    INCIDENT_BASIC_DATA_SUBMIT_REQUEST,
    INCIDENT_BASIC_DATA_SUBMIT_SUCCESS,
    INCIDENT_BASIC_DATA_SUBMIT_ERROR,
    INCIDENT_STEPPER_FORWARD,
    INCIDENT_STEPPER_BACKWARD
} from './IncidentFiling.types'

/*
 * action creators
 */


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

export function recieveIncidentSubmitError(submitResponseError) {
    return {
        type: INCIDENT_BASIC_DATA_SUBMIT_ERROR,
        submitResponseError
    }
}

export function submitIncidentBasicData(incidentData) {
    return function (dispatch) {
        dispatch(requestIncidentSubmit());
        return postIncidentReport(incidentData)
            .then(
                response => response.data,
                error => {
                    console.log('error occured', error)
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