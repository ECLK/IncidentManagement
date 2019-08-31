
import handler from './apiHandler'
import * as mockapi from '../data/mockapi';

export const getChannels = async () => {
    return (await handler.get('/channels')).data;
}

export const getCategories = async () => {
    return (await handler.get('/categories')).data;
}

export const getProvinces = async () => {
    return mockapi.getProvinces();
}

export const getDistricts = async () => {
    // return (await handler.get('/districts')).data;
    return mockapi.getDistricts();
}

export const getDivisionalSecretariats = async () => {
    return mockapi.getDivisionalSecretariats();
}

export const getGramaNiladharis = async () => {
    return mockapi.getGramaNiladharis();
}

export const getPollingStations = async () => {
    // return (await handler.get('/pollingstations')).data;
    return mockapi.getPollingStations();
}

export const getPollingDivisions = async () => {
    return mockapi.getPollingDivisions();
}

export const getPoliceStations = async () => {
    // return (await handler.get('/policestations')).data;
    return mockapi.getPoliceStations();
}

export const getPoliceDivisions = async () => {
    return mockapi.getPoliceDivisions();
}

export const getWards = async () => {
    return (await handler.get('/wards')).data;
}

export const getElections = async () => {
    // return handler.get('/elections')
    return mockapi.getElections();
}
