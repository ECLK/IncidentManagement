import handler from './apiHandler'

export const createIncident = async (incidentData) => {
    return handler.post('/incidents', incidentData);
}

export const updateReporter = async (reporterId, reporterData) => {
    return handler.put(`/reporters/${reporterId}`, reporterData);
}

export const updateIncident = async (incidentId, incidentData) => {
    return handler.put(`/incidents/${incidentId}`, incidentData);
}