import handler from './apiHandler'
import * as mockapi from '../data/mockapi';

export const getEvents = async () => {
    return mockapi.getEvents();
}

export const updateEventApproval = async (eventId, decision) => {
    return mockapi.resolveEvent(eventId, decision);
}

