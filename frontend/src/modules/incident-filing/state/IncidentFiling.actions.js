import {

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
import { createIncident, updateIncident, updateReporter, getIncident, getReporter, uploadFile, uploadFilePublic, attachMedia } from '../../../api/incident';
import * as publicAPI from '../../../api/public';

import { getActiveIncidentDataSuccess, fetchActiveIncidentData } from '../../shared/state/Shared.actions'

import { history } from '../../../routes/history';

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

export function submitInternalIncidentData(incidentData, fileData) {
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

            // upload file
            if(fileData){
                let result = await uploadFile(incident.id, fileData);
                const mediaData = {
                    "file_id": result.data.id
                  };
                result = await attachMedia(incident.id, mediaData);
            }

            dispatch(submitInternalIncidentSuccess(incident));
            history.push(`/app/review/${incident.id}`);
        }catch(error){
            dispatch(submitInternalIncidentError(error));
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
          message: "Incident updated"
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






