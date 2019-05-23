
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
    INCIDENT_REPORTER_UPDATE_ERROR,

    INCIDENT_GET_DATA_REQUEST,
    INCIDENT_GET_DATA_SUCCESS,
    INCIDENT_GET_DATA_ERROR,

    RESET_INCIDENT_FORM
} from './IncidentFiling.types'

const initialState = {

    isIncidentLoading: false,

    error: null,
    hasError: false,

    guestIncidentForm: {
        activeStep: 0,
        isSubmitting:false
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
                draft.guestIncidentForm.isSubmitting = true;
                return draft
            case INCIDENT_BASIC_DATA_SUBMIT_SUCCESS:
                draft.guestIncidentForm.isSubmitting = false;

                draft.incident = action.data.incident;
                draft.reporter = action.data.reporter;

                return draft
            case INCIDENT_BASIC_DATA_SUBMIT_ERROR:
                draft.guestIncidentForm.isSubmitting = false;
                draft.hasError = true;
                draft.error = action.error;
                return draft

            case INCIDENT_BASIC_DATA_UPDATE_REQUEST:
                draft.guestIncidentForm.isSubmitting = true;
                return draft
            case INCIDENT_BASIC_DATA_UPDATE_SUCCESS:
                draft.guestIncidentForm.isSubmitting = false;
                return draft
            case INCIDENT_BASIC_DATA_UPDATE_ERROR:
                draft.guestIncidentForm.isSubmitting = false;
                draft.hasError = true;
                draft.error = action.error;
                return draft
            
            case INCIDENT_REPORTER_UPDATE_REQUEST:
                draft.guestIncidentForm.isSubmitting = true;
                return draft
            case INCIDENT_REPORTER_UPDATE_SUCCESS:
                draft.guestIncidentForm.isSubmitting = false;
                return draft
            case INCIDENT_REPORTER_UPDATE_ERROR:
                draft.guestIncidentForm.isSubmitting = false;
                return draft

            case INCIDENT_GET_DATA_REQUEST:
                draft.isIncidentLoading = true;
                return draft
            case INCIDENT_GET_DATA_SUCCESS:
                draft.isIncidentLoading = false;
                draft.incident = action.data.incident;
                draft.reporter = action.data.reporter;
                return draft
            case INCIDENT_GET_DATA_ERROR:
                draft.isIncidentLoading = false;
                draft.hasError = true;
                draft.error = action.error;
                return draft
            case RESET_INCIDENT_FORM:
                draft.guestIncidentForm = {
                    activeStep: 0,
                    isSubmitting:false
                };
                return draft;
        }
    })
}


