
import {getInitialIncidents} from '../../../../api'
import { GET_ALL_INITIAL_INCIDENTS_REQUEST, GET_ALL_INITIAL_INCIDENTS_SUCCESS, GET_ALL_INITIAL_INCIDENTS_FAILED } from './ReviewIncident.types'

/*
 * action creators
 */

export function getInitialIncidentsRequest() {
    return {
        type: GET_ALL_INITIAL_INCIDENTS_REQUEST,
    }
}

export function getInitialIncidentsSuccess(incidents) {
    return {
        type: GET_ALL_INITIAL_INCIDENTS_SUCCESS,
        incidents
    }
}

export function getInitialIncidentsFailed(error) {
    return {
        type: GET_ALL_INITIAL_INCIDENTS_FAILED,
        error
    }
}



export function getInitialIncidents(){
    return function(dispatch){
        dispatch(getInitialIncidentsRequest());
        return getInitialIncidents()
        .then(
            response => response.data,
            error=> {
                console.log('error occured', error)
                dispatch(getInitialIncidentsSuccess(error))
            }
        )
        .then(json =>
            dispatch(getInitialIncidentsFailed(json))
        )
    }
}