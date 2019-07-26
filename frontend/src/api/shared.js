
import handler from './apiHandler'
import * as mockapi from '../data/mockapi';

export const getCategories = async () => {
    return (await handler.get('/categories')).data;
}

export const getDistricts = async () => {
    return (await handler.get('/districts')).data;
}

export const getPoliceStations = async () => {
    return (await handler.get('/policestations')).data;
}

export const getPollingStations = async () => {
    return (await handler.get('/pollingstations')).data;
}

export const getWards = async () => {
    return (await handler.get('/wards')).data;
}

export const getElections = async () => {
    return handler.get('/elections')
}

// from mock data
export const getDSDivisions = async () => {
    return mockapi.getDSDivisions();
}

export const getPollingDivisions = async () => {
    return mockapi.getPollingDivisions();
}
