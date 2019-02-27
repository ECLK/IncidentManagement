import { INCIDENT_SUBMIT_REQUEST, INCIDENT_SUBMIT_SUCCESS, INCIDENT_SUBMIT_ERROR } from './IncidentFiling.types'

const initialState = {
    isIncidentSubmitting:false,
}

export default function incidentReducer(state, action){
    if (typeof state === 'undefined') {
        return initialState
    }
    switch(action.type){
        case INCIDENT_SUBMIT_REQUEST:
            return Object.assign({}, state, {
                isIncidentSubmitting:true
            })
        case INCIDENT_SUBMIT_SUCCESS:
            return Object.assign({}, state, {
                isIncidentSubmitting: false
            })
        case INCIDENT_SUBMIT_ERROR:
            return Object.assign({}, state, {
                isIncidentSubmitting: false
                //TODO: add error handling logic here
            })
        default:
            return state
        
    }
}