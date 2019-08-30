// incidentActions.js
// implemented using redux starter kit. 
// For now only used for the guest incident form
// Move all the incident actions here later and use this app wide.
// Adapt the sampe pattern in other redux actions as well.


import { createAction } from 'redux-starter-kit';
import * as incidentsApi from '../../../api/incident';
import * as publicApi from '../../../api/public';


//create incident from public endpoint
export const createGuestIncidentRequest = createAction('INCIDENT/CREATE_GUEST_INCIDENT_REQUEST');
export const createGuestIncidentSuccess = createAction('INCIDENT/CREATE_GUEST_INCIDENT_SUCCESS');
export const createGuestIncidentError = createAction('INCIDENT/CREATE_GUEST_INCIDENT_ERROR');

export const createGuestIncident = (incidentData) => {
    return async function(dispatch) {
        dispatch(createGuestIncidentRequest());
        try{
            const response = await publicApi.createIncident(incidentData);
            dispatch(createGuestIncidentSuccess({data:response.data}));
        }catch(error){
            console.log(error);
            dispatch(createGuestIncidentError(error));
        }
    }
}



//load incident from public endpoint
export const loadGuestIncidentRequest = createAction('INCIDENT/LOAD_GUEST_INCIDENT_REQUEST');
export const loadGuestIncidentSuccess = createAction('INCIDENT/LOAD_GUEST_INCIDENT_SUCCESS');
export const loadGuestIncidentError = createAction('INCIDENT/LOAD_GUEST_INCIDENT_ERROR');

export const loadGuestIncident = (incidentId) => {
    return async function(dispatch) {
        dispatch(loadGuestIncidentRequest());
        try{
            // const response = await publicApi.getIncident(incidentId);
            // dispatch(loadGuestIncidentSuccess({data:response.data}));
        }catch(error){
            console.log(error);
            dispatch(loadGuestIncidentError(error));
        }
    }
}



//update incident from public endpoint
export const updateGuestIncidentRequest = createAction('INCIDENT/UPDATE_GUEST_INCIDENT_REQUEST');
export const updateGuestIncidentSuccess = createAction('INCIDENT/UPDATE_GUEST_INCIDENT_SUCCESS');
export const updateGuestIncidentError = createAction('INCIDENT/UPDATE_GUEST_INCIDENT_ERROR');

export const updateGuestIncident = (incidentId, incidentData) => {
    return async function(dispatch) {
        dispatch(updateGuestIncidentRequest());
        try{
            const response = await incidentsApi.updateIncident(incidentId, incidentData);
            //reloading incident
            dispatch(updateGuestIncidentSuccess({data:response.data}));
        }catch(error){
            console.log(error);
            dispatch(updateGuestIncidentError(error));
        }
    }
}



//load incident reporter from public endpoint
export const loadGuestIncidentReporterRequest = createAction('INCIDENT/LOAD_GUEST_INCIDENT_REPORTER_REQUEST');
export const loadGuestIncidentReporterSuccess = createAction('INCIDENT/LOAD_GUEST_INCIDENT_REPORTER_SUCCESS');
export const loadGuestIncidentReporterError = createAction('INCIDENT/LOAD_GUEST_INCIDENT_REPORTER_ERROR');

export const loadGuestIncidentReporter = (reporterId) => {
    return async function(dispatch) {
        dispatch(loadGuestIncidentReporterRequest());
        try{
            const response = await incidentsApi.getReporter(reporterId);
            dispatch(loadGuestIncidentReporterSuccess({data:response.data}));
        }catch(error){
            console.log(error);
            dispatch(loadGuestIncidentReporterError({error}));
        }
    }
}



//update incident from public endpoint
export const updateGuestIncidentReporterRequest = createAction('INCIDENT/UPDATE_GUEST_INCIDENT_REPORTER_REQUEST');
export const updateGuestIncidentReporterSuccess = createAction('INCIDENT/UPDATE_GUEST_INCIDENT_REPORTER_SUCCESS');
export const updateGuestIncidentReporterError = createAction('INCIDENT/UPDATE_GUEST_INCIDENT_REPORTER_ERROR');

export const updateGuestIncidentReporter = (reporterId, reporterData) => {
    return async function(dispatch) {
        dispatch(updateGuestIncidentRequest());
        try{
            const response = await publicApi.updateReporter(reporterId, reporterData);
            //reloading reporter
            dispatch(updateGuestIncidentSuccess({data:response.data}));
        }catch(error){
            console.log(error);
            dispatch(updateGuestIncidentError(error));
        }
    }
}



//file upload
export const uploadFileGuestRequest = createAction('INCIDENT/UPLOAD_FILE_GUEST_REQUEST')
export const uploadFileGuestSuccess = createAction('INCIDENT/UPLOAD_FILE_GUEST_SUCCESS')
export const uploadFileGuestError = createAction('INCIDENT/UPLOAD_FILE_GUEST_ERROR')

export const uploadFileGuest = (incidentId, formData) => {
    return async (dispatch) => {
        dispatch(uploadFileGuestRequest())
        let result = await incidentsApi.uploadFile(incidentId, formData)
        const mediaData = {
            "file_id": result.data.id
        };
        result = await publicApi.attachMedia(incidentId, mediaData);
        dispatch(uploadFileGuestSuccess(result))
    }
}











