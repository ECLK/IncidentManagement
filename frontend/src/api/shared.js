
import handler from './apiHandler'
import * as mockapi from '../data/mockapi';

export const getChannels = async () => {
    return (await handler.get('/channels')).data;
}

export const getCategories = async () => {
    return (await handler.get('/categories')).data;
}

export const getInstitutions = async () => {
    return mockapi.getInstitutions()
}

export const getProvinces = async () => {
    return (await handler.get('/provinces')).data;
}

export const getDistricts = async () => {
    return (await handler.get('/districts')).data;
}

export const getDivisionalSecretariats = async () => {
    // return (await handler.get('/dsdivisions')).data;
    return mockapi.getDivisionalSecretariats();
}

export const getGramaNiladharis = async () => {
    // return (await handler.get('/gndivisions')).data;
    return mockapi.getGramaNiladharis();
}

export const getPollingStations = async () => {
    // return (await handler.get('/pollingstations')).data;
    return mockapi.getPollingStations();
}

export const getPollingDivisions = async () => {
    // return (await handler.get('/pollingdivisions')).data;
    return mockapi.getPollingDivisions();
}

export const getPoliceStations = async () => {
    return (await handler.get('/policestations')).data;
    // return mockapi.getPoliceStations();
}

export const getPoliceDivisions = async () => {
    return (await handler.get('/policedivisions')).data;
    // return mockapi.getPoliceDivisions();
}

export const getWards = async () => {
    return (await handler.get('/wards')).data;
}

export const getElections = async () => {
    // return handler.get('/elections')
    return mockapi.getElections();
}

export const getPoliticalParties = async () => {
    return (await handler.get('/politicalparties')).data;
}