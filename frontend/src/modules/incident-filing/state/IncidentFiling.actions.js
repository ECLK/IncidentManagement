import {
    SUBMIT_INCIDENT,
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

    RESET_INCIDENT_FORM,

    INCIDENT_FILE_UPLOAD_REQUEST,
    INCIDENT_FILE_UPLOAD_SUCCESS,
    INCIDENT_FILE_UPLOAD_ERROR,

    PUBLIC_FILE_UPLOAD_REQUEST,
    PUBLIC_FILE_UPLOAD_SUCCESS,
    PUBLIC_FILE_UPLOAD_ERROR,

    SUBMIT_INTERNAL_INCIDENT,
    SUBMIT_INTERNAL_INCIDENT_SUCCESS,
    SUBMIT_INTERNAL_INCIDENT_ERROR,

    UPDATE_INTERNAL_INCIDENT,
    UPDATE_INTERNAL_INCIDENT_SUCCESS,
    UPDATE_INTERNAL_INCIDENT_ERROR

} from './IncidentFiling.types'
import { createIncident, updateIncident, updateReporter, getIncident, getReporter, uploadFile, uploadFilePublic } from '../../../api/incident';
import * as publicAPI from '../../../api/public';

import { getActiveIncidentDataSuccess, fetchActiveIncidentData } from '../../shared/state/Shared.actions'

import history from '../../../routes/history';

// Form Submission

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
        isLoading: true
    }
}

export function recieveIncidentSubmitSuccess(submitResponse) {
    history.replace({ ...history.location, pathname: `/app/report/${submitResponse.incident.id}`});

    return {
        type: INCIDENT_BASIC_DATA_SUBMIT_SUCCESS,
        data: submitResponse,
        error: null,
        isLoading: false,
        confirm: {
          message: "Incident submitted"
        }
    }
}

export function recieveIncidentSubmitError(errorResponse) {
    return {
        type: INCIDENT_BASIC_DATA_SUBMIT_ERROR,
        data: null,
        error: errorResponse,
        isLoading: false
    }
}

export function submitIncidentBasicData(incidentData) {
    return async function(dispatch) {
        dispatch(requestIncidentSubmit());
        try{
            const response = await createIncident(incidentData);
            const _transform = {
                incident: response.data,
                reporter: { 
                    id:response.data.reporter
                }
            };

            await dispatch(getActiveIncidentDataSuccess(_transform));
            await dispatch(recieveIncidentSubmitSuccess(_transform));
            await dispatch(stepForwardIncidentStepper());
        }catch(error){
            console.log(error);
            await dispatch(recieveIncidentSubmitError(error));
        }
    }
}

// Update incident

export function requestIncidentUpdate() {
    return {
        type: INCIDENT_BASIC_DATA_UPDATE_REQUEST,
        isLoading: true
    }
}

export function recieveIncidentUpdateSuccess(submitResponse) {
    return {
        type: INCIDENT_BASIC_DATA_UPDATE_SUCCESS,
        data: submitResponse,
        error: null,
        isLoading: false,
        confirm: {
          message: "Incident updated"
        }
    }
}

export function recieveIncidentUpdateError(errorResponse) {
    return {
        type: INCIDENT_BASIC_DATA_UPDATE_ERROR,
        data: null,
        error: errorResponse,
        isLoading: false
    }
}

export function fetchUpdateIncident(incidentId, incidentData) {
    return async function (dispatch) {
        dispatch(requestIncidentUpdate());
        try{
            const updatableFields = [
                "address",
                "category",
                "coordinates",
                "description",
                "district",
                "ds_division",
                "infoChannel",
                "location",
                "occurrence",
                "police_station",
                "polling_station",
                "title",
                "ward",
                "response_time",

                "refId",
                "election"
            ];
            const incidentUpdate = updatableFields.reduce((a, e) => (a[e] = incidentData[e], a), {});

            const response = await updateIncident(incidentId, incidentUpdate);
            dispatch(recieveIncidentUpdateSuccess(response.data));
            dispatch(fetchActiveIncidentData(incidentId));
            dispatch(stepForwardIncidentStepper());
        }catch(error){
            await dispatch(recieveIncidentUpdateError(error));
        }
    }
}

// Update reporter

export function requestReporterUpdate() {
    return {
        type: INCIDENT_REPORTER_UPDATE_REQUEST,
        isLoading: true
    }
}

export function recieveReporterUpdateSuccess(response) {
    return {
        type: INCIDENT_REPORTER_UPDATE_SUCCESS,
        data: response,
        error: null,
        isLoading: false,
        confirm: {
          message: "Reporter updated"
        }
    }
}

export function recieveReporterUpdateError(errorResponse) {
    return {
        type: INCIDENT_REPORTER_UPDATE_ERROR,
        data: null,
        error: errorResponse,
        isLoading: false
    }
}

export function fetchUpdateReporter(incidentId, reporterId, reporterData) {
    return async function (dispatch) {
        dispatch(requestReporterUpdate());
        try{
            const reporterUpdate = {
                "name": reporterData["reporter_name"],
                "reporter_type": reporterData["reporter_type"],
                "email": reporterData["reporter_email"],
                "telephone": reporterData["reporter_telephone"],
                "address": reporterData["reporter_address"],
            }
            const response = await updateReporter(reporterId, reporterUpdate);
            await dispatch(recieveReporterUpdateSuccess(response.data));
            await dispatch(fetchActiveIncidentData(incidentId));
            await dispatch(stepForwardIncidentStepper());
        }catch(error){
            await dispatch(recieveReporterUpdateError(error));
        }
    }
}

// get Incident

export function requestIncidentData() {
    return {
        type: INCIDENT_GET_DATA_REQUEST,
        isLoading: true
    }
}

export function getIncidentDataSuccess(response) {
    return {
        type: INCIDENT_GET_DATA_SUCCESS,
        data: response,
        error: null,
        isLoading: false
    }
}

export function getIncidentDataError(errorResponse) {
    return {
        type: INCIDENT_GET_DATA_ERROR,
        data: null,
        error: errorResponse,
        isLoading: false
    }
}

export function fetchIncidentData(incidentId) {
    return async function (dispatch) {
        dispatch(requestIncidentData(incidentId));
        try{
            const responseIncident = await getIncident(incidentId);
            const responseReporter = await getReporter(responseIncident.data.reporter_id);
            await dispatch(getIncidentDataSuccess({
                "incident": responseIncident.data,
                "reporter": responseReporter.data
            }));
        }catch(error){
            await dispatch(getIncidentDataError(error));
        }
    }
}


export function resetIncidentForm() {
    return {
        type: RESET_INCIDENT_FORM,
        data: null,
        error: null
    }
}


export function incidentFileUploadRequest() {
    return {
        type: INCIDENT_FILE_UPLOAD_REQUEST,
        data: null,
        error: null
    }
}

export function incidentFileUploadSuccess() {
    return {
        type: INCIDENT_FILE_UPLOAD_SUCCESS,
        data: null,
        error: null
    }
}

export function incidentFileUploadError() {
    return {
        type: INCIDENT_FILE_UPLOAD_ERROR,
        data: null,
        error: null
    }
}

export function incidentFileUpload(incidentId, formData) {
    return async (dispatch) => {
        try{
            dispatch(incidentFileUploadRequest());
            const result = await uploadFile(incidentId, formData)
            dispatch(incidentFileUploadSuccess())
        }catch(e){
            dispatch(incidentFileUploadError())
        }
    }
}


export function publicFileUploadRequest() {
    return {
        type: PUBLIC_FILE_UPLOAD_REQUEST,
        data: null,
        error: null
    }
}

export function publicFileUploadSuccess() {
    return {
        type: PUBLIC_FILE_UPLOAD_SUCCESS,
        data: null,
        error: null
    }
}

export function publicFileUploadError() {
    return {
        type: PUBLIC_FILE_UPLOAD_ERROR,
        data: null,
        error: null
    }
}


export function requestInternalIncidentData() {
    return {
        type: SUBMIT_INTERNAL_INCIDENT,
        isLoading: true
    }
}

export function submitInternalIncidentSuccess(incidentData) {
    // history.replace({ ...history.location, pathname: `/app/review/${incidentData.id}`});

    return {
        type: SUBMIT_INTERNAL_INCIDENT_SUCCESS,
        data: incidentData,
        error: null,
        isLoading: false,
        confirm: {
          message: "Incident created"
        }
    }
}

export function submitInternalIncidentError(errorResponse) {
    return {
        type: SUBMIT_INTERNAL_INCIDENT_ERROR,
        data: null,
        error: errorResponse,
        isLoading: false
    }
}

export function submitInternalIncidentData(incidentData) {
    return async function(dispatch) {
        dispatch(requestInternalIncidentData());
        try{
            const incident = (await createIncident(incidentData)).data;
            const reporterId = incident.reporter;
            const reporterUpdate = {
                "name": incidentData["reporterName"],
                "reporter_type": incidentData["reporterType"],
                "email": incidentData["reporterEmail"],
                "telephone": incidentData["reporterMobile"],
                "address": incidentData["reporterAddress"],
            }
            await updateReporter(reporterId, reporterUpdate);
            await dispatch(submitInternalIncidentSuccess(incident));
        }catch(error){
            await dispatch(submitInternalIncidentError(error));
        }
    }
}


export function updateInternalIncidentData() {
    return {
        type: UPDATE_INTERNAL_INCIDENT,
        isLoading: true
    }
}

export function updateInternalIncidentSuccess(incidentData) {
    // history.replace({ ...history.location, pathname: `/app/review/${incidentData.id}`});

    return {
        type: UPDATE_INTERNAL_INCIDENT_SUCCESS,
        data: incidentData,
        error: null,
        isLoading: false,
        confirm: {
          message: "Incident created"
        }
    }
}

export function updateInternalIncidentError(errorResponse) {
    return {
        type: UPDATE_INTERNAL_INCIDENT_ERROR,
        data: null,
        error: errorResponse,
        isLoading: false
    }
}

export function fetchUpdateInternalIncidentData(incidentId, incidentData) {
    return async function(dispatch) {
        dispatch(updateInternalIncidentData());
        try{
            const incident = (await updateIncident(incidentId, incidentData)).data;
            const reporterId = incident.reporter;
            const reporterUpdate = {
                "name": incidentData["reporterName"],
                "reporter_type": incidentData["reporterType"],
                "email": incidentData["reporterEmail"],
                "telephone": incidentData["reporterMobile"],
                "address": incidentData["reporterAddress"],
            }
            await updateReporter(reporterId, reporterUpdate);
            
            dispatch(updateInternalIncidentSuccess(incident));
            dispatch(fetchActiveIncidentData(incidentId));
        }catch(error){
            dispatch(updateInternalIncidentError(error));
        }
    }
}






