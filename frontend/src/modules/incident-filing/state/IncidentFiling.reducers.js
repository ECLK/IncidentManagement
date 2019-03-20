
import produce from "immer"

import {
    INCIDENT_BASIC_DATA_SUBMIT_REQUEST,
    INCIDENT_BASIC_DATA_SUBMIT_SUCCESS,
    INCIDENT_BASIC_DATA_SUBMIT_ERROR,
    INCIDENT_STEPPER_FORWARD,
    INCIDENT_STEPPER_BACKWARD,
    INCIDENT_BASIC_DATA_UPDATE_REQUEST,
    INCIDENT_BASIC_DATA_UPDATE_SUCCESS,
    INCIDENT_BASIC_DATA_UPDATE_ERROR,
    INCIDENT_REPORTER_UPDATE_REQUEST,
    INCIDENT_REPORTER_UPDATE_SUCCESS,
    INCIDENT_REPORTER_UPDATE_ERROR
} from './IncidentFiling.types'

const initialState = {
    incident_id: null,
    reporter_id: null,

    isIncidentPosting: false,

    error: null,
    hasError: false,

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
                draft.incident_id = action.data.incident_id;
                draft.reporter_id = action.data.reporter_id;
                return draft
            case INCIDENT_BASIC_DATA_SUBMIT_ERROR:
                draft.guestIncidentForm.stepOneSubmission.inProgress = false;
                draft.hasError = true;
                draft.error = action.error;
                return draft

            case INCIDENT_BASIC_DATA_UPDATE_REQUEST:
                draft.isIncidentPosting = true;
                return draft
            case INCIDENT_BASIC_DATA_UPDATE_SUCCESS:
                draft.isIncidentPosting = false;
                return draft
            case INCIDENT_BASIC_DATA_UPDATE_ERROR:
                draft.isIncidentPosting = false;
                draft.hasError = true;
                draft.error = action.error;
                return draft
            
            case INCIDENT_REPORTER_UPDATE_REQUEST:
                return draft
            case INCIDENT_REPORTER_UPDATE_SUCCESS:
                return draft
            case INCIDENT_REPORTER_UPDATE_ERROR:
                return draft
        }
    })
}


