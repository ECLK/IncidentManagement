import {postIncidentReport} from '../../../api'
import { 
    SUBMIT_INCIDENT, 
    INCIDENT_SUBMIT_REQUEST, 
    INCIDENT_SUBMIT_SUCCESS, 
    INCIDENT_SUBMIT_ERROR } from './IncidentFiling.types'

/*
 * action creators
 */

export function requestIncidentSubmit() {
    return {
        type: INCIDENT_SUBMIT_REQUEST,
    }
}

export function recieveIncidentSubmitSuccess(submitResponse) {
    return {
        type: INCIDENT_SUBMIT_SUCCESS,
        submitResponse
    }
}

export function recieveIncidentSubmitError(submitResponseError) {
    return {
        type: INCIDENT_SUBMIT_ERROR,
        submitResponseError
    }
}

export function submitIncident(incidentData){
    return function(dispatch){
        dispatch(requestIncidentSubmit());
        return postIncidentReport(incidentData)
        .then(
            response => response.data,
            error=> {
                console.log('error occured', error)
                dispatch(recieveIncidentSubmitError(error))
            }
        )
        .then(json =>
            dispatch(recieveIncidentSubmitSuccess(json))
        )
    }
}