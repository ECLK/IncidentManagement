import {
    REQUEST_INCIDENT_CATAGORIES,
    REQUEST_INCIDENT_CATAGORIES_SUCCESS,
    REQUEST_INCIDENT_CATAGORIES_FAILURE
} from './Shared.types'
import { createIncident, updateIncident, updateReporter } from '../../../api/incident';
import {getIncidentCatogories} from '../../../api/shared';

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
