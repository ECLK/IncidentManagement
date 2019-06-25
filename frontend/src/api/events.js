import handler from './apiHandler'
import * as mockapi from '../data/mockapi';

export const getEvents = async (incidentId) => {
    return mockapi.getEvents(incidentId);
}

export const updateEventApproval = async (eventId, decision) => {
    return mockapi.resolveEvent(eventId, decision);
}

