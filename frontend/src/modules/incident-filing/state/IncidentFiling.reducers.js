import {
    INCIDENT_BASIC_DATA_SUBMIT_REQUEST,
    INCIDENT_BASIC_DATA_SUBMIT_SUCCESS,
    INCIDENT_BASIC_DATA_SUBMIT_ERROR,
    INCIDENT_STEPPER_FORWARD,
    INCIDENT_STEPPER_BACKWARD
} from './IncidentFiling.types'

const initialState = {
    guestIncidentForm: {
        activeStep: 0,
        stepOneSubmission: {
            inProgress: false,
            error: [],
            result: null
        }
    }
}

export default function incidentReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState
    }
    let newState = {}
    switch (action.type) {
        case INCIDENT_STEPPER_FORWARD:
            newState = JSON.parse(JSON.stringify(state)); //deep copy state object. prolly need a better way
            newState.guestIncidentForm.activeStep = state.guestIncidentForm.activeStep + 1;
            return newState;
        case INCIDENT_STEPPER_BACKWARD:
            newState = JSON.parse(JSON.stringify(state));
            newState.guestIncidentForm.activeStep = state.guestIncidentForm.activeStep - 1;
            return newState;
        case INCIDENT_BASIC_DATA_SUBMIT_REQUEST:
            newState = JSON.parse(JSON.stringify(state));
            newState.guestIncidentForm.stepOneSubmission.inProgress = true;
            return newState;
        case INCIDENT_BASIC_DATA_SUBMIT_SUCCESS:
            newState = JSON.parse(JSON.stringify(state));
            newState.guestIncidentForm.stepOneSubmission.inProgress = false;
            return newState;
        case INCIDENT_BASIC_DATA_SUBMIT_ERROR:
            newState = JSON.parse(JSON.stringify(state));
            newState.guestIncidentForm.stepOneSubmission.inProgress = false;
            return newState
        default:
            return state

    }
}