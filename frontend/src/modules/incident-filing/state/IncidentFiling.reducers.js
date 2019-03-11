import {
    INCIDENT_BASIC_DATA_SUBMIT_REQUEST,
    INCIDENT_BASIC_DATA_SUBMIT_SUCCESS,
    INCIDENT_BASIC_DATA_SUBMIT_ERROR,
    INCIDENT_STEPPER_FORWARD,
    INCIDENT_STEPPER_BACKWARD
} from './IncidentFiling.types'

const initialState = {
    incidentFormActiveStep: 0,
    isIncidentBasicDetailsSubmitting: false,
}

export default function incidentReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch (action.type) {
        case INCIDENT_STEPPER_FORWARD:
            return Object.assign({}, state, {
                incidentFormActiveStep: state.incidentFormActiveStep+1
            })
        case INCIDENT_STEPPER_BACKWARD:
            return Object.assign({}, state, {
                incidentFormActiveStep: state.incidentFormActiveStep-1
            })
        case INCIDENT_BASIC_DATA_SUBMIT_REQUEST:
            return Object.assign({}, state, {
                isIncidentBasicDetailsSubmitting: true
            })
        case INCIDENT_BASIC_DATA_SUBMIT_SUCCESS:
            return Object.assign({}, state, {
                isIncidentBasicDetailsSubmitting: false,
            })
        case INCIDENT_BASIC_DATA_SUBMIT_ERROR:
            return Object.assign({}, state, {
                isIncidentBasicDetailsSubmitting: false,
                //TODO: add error handling logic here
            })
        default:
            return state

    }
}