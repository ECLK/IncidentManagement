import handler from './apiHandler'

export const createIncident = (incidentData) => {
    return handler.post('/incidents', incidentData);
}

export const updateReporter = (reporterId, reporterData) => {
    return handler.post(`/reporters/${reporterId}`, reporterData);
}

export const updateIncident = (incidentId, incidentData) => {
    return handler.post(`/incidents/${incidentId}`, incidentData);
}