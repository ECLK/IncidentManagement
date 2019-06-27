import handler from './apiHandler'
import * as mockapi from '../data/mockapi';

export const getEvents = async (incidentId) => {
    // return mockapi.getEvents(incidentId);
    return (await handler.get(`/incidents/${incidentId}/events`)).data;
}

export const updateEventApproval = async (eventId, decision) => {
    return mockapi.resolveEvent(eventId, decision);
}

