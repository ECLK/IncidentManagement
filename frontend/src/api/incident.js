import handler from './apiHandler'
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

import * as mockapi from '../data/mockapi';

export const createIncident = async (incidentData) => {
    return mockapi.createIncident(incidentData);
};

export const getIncident = async (incidentId) => {
    // return mockapi.getIncident(incidentId);
    return (await handler.get(`/incidents/${incidentId}`)).data;
};

export const getIncidents = async (filters) => {
    // return mockapi.getIncidents();
    return (await handler.get('/incidents/')).data;
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
    return mockapi.changeStatus(incidentId, status);
}

export const changeSeverity = async (incidentId, severity) => {
    return mockapi.changeSeverity(incidentId, severity);
}

export const assignToIncident = async (incidentId, uid) => {
    return mockapi.assignToIncident(incidentId, uid);
}

export const removeFromIncident = async (incidentId, uid) => {
    return mockapi.removeFromIncident(incidentId, uid);
}
