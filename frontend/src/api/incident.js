import * as mockapi from "../data/mockapi";

import handler from "./apiHandler";
import moment from "moment";

/*
 * mock API for Incidents
 */



export const createIncident = async incidentData => {
  // return mockapi.createIncident(incidentData);
  return (await handler.post(`/incidents/`, incidentData)).data;
};

export const getIncident = async (incidentId) => {
  return (await handler.get(`/incidents/${incidentId}`)).data;
};

export const getIncidents = async (filters, page = 1) => {
  var query = "page=" + page;

  if (filters.textSearch) {
    query += "&q=" + filters.textSearch;
  }

  if (filters.severity) {
    query += "&severity=" + filters.severity;
  }

  if (filters.status) {
    query += "&status=" + filters.status;
  }

  if (filters.maxResponseTime) {
    query += "&response_time=" + filters.maxResponseTime;
  }
  if (filters.incidentType) {
    query += "&incident_type=" + filters.incidentType;
  }

  if (filters.severity) {
    query += "&severity=" + filters.severity;
  }

  if (filters.assignee) {
    query += "&assignee=" + filters.assignee;
  }

  if (filters.user_linked) {
    query += "&user_linked=" + filters.user_linked;
  }

  if (filters.institution) {
    query += "&institution=" + filters.institution;
  }

  if (filters.district) {
    query += "&district=" + filters.district;
  }

  if (filters.startTime && filters.endTime) {
    const startDate = moment(filters.startTime).format("YYYY-MM-DD HH:mm");
    const endDate = moment(filters.endTime).format("YYYY-MM-DD HH:mm");
    query += "&start_date=" + startDate + "&end_date=" + endDate;
  }

  if (filters.export) {
    query += "&export=" + filters.export;
  }

  if (filters.show_closed) {
    query += "&show_closed=" + filters.show_closed;
  }

  if (filters.title) {
    query += "&title=" + filters.title;
  }

  return (await handler.get(`/incidents/?${query}`)).data;
};

export const updateIncident = async (incidentId, incidentData) => {
  return (await handler.put(`/incidents/${incidentId}`, incidentData)).data;
};

export const getReporter = async (reporterId) => {
  return (await handler.get(`/reporters/${reporterId}`)).data;
};

export const updateReporter = async (reporterId, reporterData) => {
  return (await handler.put(`/reporters/${reporterId}`, reporterData)).data;
}

export const changeStatus = async (incidentId, status) => {
  return (await handler.get(`/incidents/${incidentId}/status?action=update&type=${status}`)).data;
};

export const assignToIncident = async (incidentId, uid) => {
  return (await handler.get(`/incidents/${incidentId}/assignee?action=change&assignee=${uid}`)).data;
};

export const removeFromIncident = async (incidentId, uid) => {
  return mockapi.removeFromIncident(incidentId, uid);
};

export const escallateIncident = async (incidentId) => {
  return (await handler.get(`/incidents/${incidentId}/escalate`)).data;
};

export const updateIncidentWorkflow = async (incidentId, workflowType, workflowUpdate) => {
  return (await handler.post(`/incidents/${incidentId}/workflow/${workflowType}`, workflowUpdate)).data;
};

export const uploadFile = async (incidentId, formData) => {
  const result = await handler.post(`/incidents/${incidentId}/files`, formData)
  return result.data;
}

export const attachMedia = async (incidentId, mediaData) => {
  return (await handler.post(`/incidents/${incidentId}/attach_media`, mediaData)).data;
}

