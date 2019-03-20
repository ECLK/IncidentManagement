
import produce from "immer"

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
    return produce(state, draft => {
        switch (action.type) {
            case INCIDENT_STEPPER_FORWARD:
                draft.guestIncidentForm.activeStep = state.guestIncidentForm.activeStep + 1;
                return draft
            case INCIDENT_STEPPER_BACKWARD:
                draft.guestIncidentForm.activeStep = state.guestIncidentForm.activeStep - 1;
                return draft
            case INCIDENT_BASIC_DATA_SUBMIT_REQUEST:
                draft.guestIncidentForm.stepOneSubmission.inProgress = true;
                return draft
            case INCIDENT_BASIC_DATA_SUBMIT_SUCCESS:
                draft.guestIncidentForm.stepOneSubmission.inProgress = false;
                return draft
            case INCIDENT_BASIC_DATA_SUBMIT_ERROR:
                draft.guestIncidentForm.stepOneSubmission.inProgress = false;
                return draft
        }
    })
}


