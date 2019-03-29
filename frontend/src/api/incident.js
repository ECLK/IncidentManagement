import handler from './apiHandler'

export const createIncident = async (incidentData) => {
    return handler.post('/incidents', incidentData);
}

export const getIncident = async (incidentId) => {
    return handler.get(`/incidents/${incidentId}`);
}

export const getReporter = async (reporterId) => {
    return handler.get(`/reporters/${reporterId}`);
}

export const updateReporter = async (reporterId, reporterData) => {
    return handler.put(`/reporters/${reporterId}`, reporterData);
}

export const updateIncident = async (incidentId, incidentData) => {
    return handler.put(`/incidents/${incidentId}`, incidentData);
}