// incidentActions.js
// implemented using redux starter kit.
// For now only used for the guest incident form
// Move all the incident actions here later and use this app wide.
// Adapt the sampe pattern in other redux actions as well.


import { createAction } from 'redux-starter-kit';
import * as incidentsApi from '../../api/incident';
import * as publicApi from '../../api/public';

// history is required to access the router and reroute on
// completing the incident creation
import { history } from '../../routes/history';
import { getIncidentEvents } from '../../event/state/eventActions';

/** Internal Incident Form Actions **/

// Create internal incident form
export const createInternalIncidentRequest = createAction('INCIDENT/CREATE_INTERNAL_INCIDENT_REQUEST');
export const createInternalIncidentSuccess = createAction('INCIDENT/CREATE_INTERNAL_INCIDENT_SUCCESS');
export const createInternalIncidentError = createAction('INCIDENT/CREATE_INTERNAL_INCIDENT_ERROR');

export function createInternalIncident(incidentData, fileData) {
    return async function(dispatch) {
        dispatch(createInternalIncidentRequest());
        try{
            const incident = (await incidentsApi.createIncident(incidentData)).data;
            const reporterId = incident.reporter;
            const reporterUpdate = {
                "name": incidentData["reporterName"],
                "reporter_type": incidentData["reporterType"],
                "email": incidentData["reporterEmail"],
                "telephone": incidentData["reporterMobile"],
                "address": incidentData["reporterAddress"],
                "politicalAffiliation": incidentData["reporterAffiliation"],
                "accusedName": incidentData["accusedName"],
                "accusedPoliticalAffiliation": incidentData["accusedAffiliation"],
            }
            await incidentsApi.updateReporter(reporterId, reporterUpdate);

            // upload file
            if(fileData){
                let result = await incidentsApi.uploadFile(incident.id, fileData);
                const mediaData = {
                    "file_id_set": result.data.map(file => file.id)
                  };
                result = await incidentsApi.attachMedia(incident.id, mediaData);
            }

            dispatch(createInternalIncidentSuccess(incident));
            history.push(`/app/review/${incident.id}`);
        }catch(error){
            dispatch(createInternalIncidentError(error));
        }
    }
}


// Update internal incident form
export const updateInternalIncidentRequest = createAction('INCIDENT/UPDATE_INTERNAL_INCIDENT_REQUEST');
export const updateInternalIncidentSuccess = createAction('INCIDENT/UPDATE_INTERNAL_INCIDENT_SUCCESS');
export const updateInternalIncidentError = createAction('INCIDENT/UPDATE_INTERNAL_INCIDENT_ERROR');

export function updateInternalIncident(incidentId, incidentData) {
    return async function(dispatch) {
        dispatch(updateInternalIncidentRequest());
        try{
            const incident = (await incidentsApi.updateIncident(incidentId, incidentData)).data;
            const reporterId = incident.reporter;
            const reporterUpdate = {
                "name": incidentData["reporterName"],
                "reporter_type": incidentData["reporterType"],
                "email": incidentData["reporterEmail"],
                "telephone": incidentData["reporterMobile"],
                "address": incidentData["reporterAddress"],
                "politicalAffiliation": incidentData["reporterAffiliation"],
                "accusedName": incidentData["accusedName"],
                "accusedPoliticalAffiliation": incidentData["accusedAffiliation"],
            }
            await incidentsApi.updateReporter(reporterId, reporterUpdate);

            dispatch(updateInternalIncidentSuccess(incident));
            dispatch(loadIncident(incidentId));
        }catch(error){
            dispatch(updateInternalIncidentError(error));
        }
    }
}

/**  --------  */


/** Common incident actions */

// Loading paginated incidents
export const loadAllIncidentsRequest = createAction('INCIDENT/LOAD_ALL_INCIDENTS_REQUEST');
export const loadAllIncidentsSuccess = createAction('INCIDENT/LOAD_ALL_INCIDENTS_SUCCESS');
export const loadAllIncidentsError = createAction('INCIDENT/LOAD_ALL_INCIDENTS_ERROR');

export function loadAllIncidents(filters = {}, page) {
  return async function(dispatch) {
    dispatch(loadAllIncidentsRequest());
    try {
      const response = await incidentsApi.getIncidents(filters, page);
      dispatch(loadAllIncidentsSuccess(response.data));
    } catch (error) {
      dispatch(loadAllIncidentsError(error));
    }
  };
}

// Loading one incident
export const loadIncidentRequest = createAction('INCIDENT/LOAD_INCIDENT_REQUEST');
export const loadIncidentSuccess = createAction('INCIDENT/LOAD_INCIDENT_Success');
export const loadIncidentError = createAction('INCIDENT/LOAD_INCIDENT_Error');
export function loadIncident(incidentId) {
    return async function (dispatch) {
        dispatch(loadIncidentRequest());
        try{
            const responseIncident = await incidentsApi.getIncident(incidentId);
            const responseReporter = await incidentsApi.getReporter(responseIncident.data.reporter);
            dispatch(loadIncidentSuccess({
                "incident": responseIncident.data,
                "reporter": responseReporter.data
            }));
        }catch(error){
            dispatch(loadIncidentError(error));
        }
    }
}

// Update status
export const updateIncidentStatusRequest = createAction('INCIDENT/UPDATE_INCIDENT_STATUS_REQUEST');
export const updateIncidentStatusSuccess = createAction('INCIDENT/UPDATE_INCIDENT_STATUS_SUCCESS');
export const updateIncidentStatusError = createAction('INCIDENT/UPDATE_INCIDENT_STATUS_ERROR');

export function updateIncidentStatus(incidentId, status) {
  return async function(dispatch) {
    dispatch(updateIncidentStatusRequest());
    try {
      const response = await incidentsApi.changeStatus(incidentId, status);
      dispatch(updateIncidentStatusSuccess(response.data));
      dispatch(loadIncident(incidentId));
      dispatch(getIncidentEvents(incidentId));
    } catch (error) {
      dispatch(updateIncidentStatusError(error));
    }
  };
}

// update search filter
export const updateIncidentSearchFilter = createAction('INCIDENT/UPDATE_INCIDENT_SEARCH_FILTER');

/** ---------- */



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


//update incident from public endpoint
export const updateGuestIncidentRequest = createAction('INCIDENT/UPDATE_GUEST_INCIDENT_REQUEST');
export const updateGuestIncidentSuccess = createAction('INCIDENT/UPDATE_GUEST_INCIDENT_SUCCESS');
export const updateGuestIncidentError = createAction('INCIDENT/UPDATE_GUEST_INCIDENT_ERROR');

export const updateGuestIncident = (incidentId, incidentData) => {
    return async function(dispatch) {
        dispatch(updateGuestIncidentRequest());
        try{
            const response = await publicApi.updateIncident(incidentId, incidentData);
            //reloading incident
            dispatch(updateGuestIncidentSuccess({data:response.data}));
        }catch(error){
            console.log(error);
            dispatch(updateGuestIncidentError(error));
        }
    }
}


//update incident from public endpoint
export const updateGuestIncidentReporterRequest = createAction('INCIDENT/UPDATE_GUEST_INCIDENT_REPORTER_REQUEST');
export const updateGuestIncidentReporterSuccess = createAction('INCIDENT/UPDATE_GUEST_INCIDENT_REPORTER_SUCCESS');
export const updateGuestIncidentReporterError = createAction('INCIDENT/UPDATE_GUEST_INCIDENT_REPORTER_ERROR');

export const updateGuestIncidentReporter = (reporterId, reporterData) => {
    return async function(dispatch) {
        dispatch(updateGuestIncidentReporterRequest());
        try{
            const response = await publicApi.updateReporter(reporterId, reporterData);
            //reloading reporter
            dispatch(updateGuestIncidentReporterSuccess({data:response.data}));
        }catch(error){
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
            "file_id_set": result.data.map(file => file.id)
        };
        result = await publicApi.attachMedia(incidentId, mediaData);
        dispatch(uploadFileGuestSuccess(result))
    }
}

//load incident by unique id
export const loadGuestIncidentRequest = createAction('INCIDENT/LOAD_GUEST_INCIDENT_REQUEST');
export const loadGuestIncidentSuccess = createAction('INCIDENT/LOAD_GUEST_INCIDENT_SUCCESS');
export const loadGuestIncidentError = createAction('INCIDENT/LOAD_GUEST_INCIDENT_ERROR');

export const loadGuestIncident = (uniqueId) => {
    return async (dispatch) => {
        dispatch(loadGuestIncidentRequest())
        try{
            const loadData = {
                "unique_id": uniqueId
            };
            const result = await publicApi.loadIncident(loadData);
            dispatch(loadGuestIncidentSuccess(result))
        }catch(error){
            dispatch(loadGuestIncidentError(error));
        }
    }
}

//reset state
export const resetIncidentState = createAction('INCIDENT/RESET_INCIDENT_STATE');


