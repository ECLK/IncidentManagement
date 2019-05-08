import handler from './apiHandler'
import * as mockapi from '../data/mockapi';

export const getEvents = async () => {
    return mockapi.getEvents();
}

