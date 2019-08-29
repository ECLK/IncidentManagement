import moment from "moment";
import handler from "./apiHandler";
// import handler from './apiHandler'

// export const createIncident = async (incidentData) => {
//     return handler.post('/incidents', incidentData);
// }

// export const getIncident = async (incidentId) => {
//     return handler.get(`/incidents/${incidentId}`);
// }

// export const getReporter = async (reporterId) => {
//     return handler.get(`/reporters/${reporterId}`);
// }

// export const updateReporter = async (reporterId, reporterData) => {
//     return handler.put(`/reporters/${reporterId}`, reporterData);
// }

// export const updateIncident = async (incidentId, incidentData) => {
//     return handler.put(`/incidents/${incidentId}`, incidentData);
// }

/*
 * mock API for Incidents
 */

import * as mockapi from "../data/mockapi";

export const createIncident = async incidentData => {
  // return mockapi.createIncident(incidentData);
  return (await handler.post(`/incidents/`, incidentData)).data;
};

export const getIncident = async (incidentId) => {
    // return mockapi.getIncident(incidentId);
    return (await handler.get(`/incidents/${incidentId}`)).data;
};

export const getIncidents = async (filters, page=1) => {
    // return mockapi.getIncidents();
    console.log(filters);
    var query = "page=" + page;

    if(filters.textSearch){
      query += "&q=" + filters.textSearch;
    }

    if(filters.severity){
      query += "&severity=" + filters.severity;
    }

    if(filters.status){
      query += "&status=" + filters.status;
    }

    if(filters.maxResponseTime){
      query += "&response_time=" + filters.maxResponseTime;
    }

    if(filters.assignee){
      query += "&assignee=" + filters.assignee;
    }

    if(filters.user_linked){
      query += "&user_linked=" + filters.user_linked;
    }

    if(filters.startTime && filters.endTime){
      const startDate = moment(filters.startTime).format("YYYY-MM-DD");
      const endDate = moment(filters.endTime).format("YYYY-MM-DD");
      query += "&start_date=" + startDate + "&end_date=" + endDate;
    }

    if(filters.export){
      query += "&export=" + filters.export;
    }

    return (await handler.get(`/incidents/?${query}`)).data;
};

export const updateIncident = async (incidentId, incidentData) => {
    // await mockapi.updateIncident(incidentId, incidentData);
    // return true;
    return (await handler.put(`/incidents/${incidentId}`, incidentData)).data;
};

export const getReporter = async (reporterId) => {
    // return mockapi.getReporter(reporterId);
    return (await handler.get(`/reporters/${reporterId}`)).data;
};

export const updateReporter = async (reporterId, reporterData) => {
    // return mockapi.updateReporter(reporterId, reporterData);
    return (await handler.put(`/reporters/${reporterId}`, reporterData)).data;
}


export const changeStatus = async (incidentId, status) => {
  return (await handler.get(`/incidents/${incidentId}/status?action=update&type=${status}`)).data;
};

export const changeSeverity = async (incidentId, severity) => {
  return mockapi.changeSeverity(incidentId, severity);
};

export const assignToIncident = async (incidentId, uid) => {
  // return mockapi.assignToIncident(incidentId, uid);
  return (await handler.get(`/incidents/${incidentId}/assignee?action=change&assignee=${uid}`)).data;
};

export const removeFromIncident = async (incidentId, uid) => {
  return mockapi.removeFromIncident(incidentId, uid);
};

export const escallateIncident = async (incidentId) => {
  return (await handler.get(`/incidents/${incidentId}/escalate`)).data;
  // return mockapi.escallateIncident(incidentId, assigneeId);
};

export const updateIncidentWorkflow = async (incidentId, workflowType, workflowUpdate) => {
  return (await handler.post(`/incidents/${incidentId}/workflow/${workflowType}`, workflowUpdate) ).data;
};

export const uploadFile = async (incidentId, formData) => {
  const result = await handler.post(`/incidents/${incidentId}/files`, formData)
  return result.data;
}

export const attachMedia = async (incidentId, mediaData) => {
  // return mockapi.addComment(incidentId, commentData);
  return (await handler.post(`/incidents/${incidentId}/attach_media`, mediaData)).data;
}

