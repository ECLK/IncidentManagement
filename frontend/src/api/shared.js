
import handler from './apiHandler'
import * as mockapi from '../data/mockapi';

export const getDistricts = async () => {
    return handler.get('/districts')
}

export const getPoliceStations = async () => {
    return handler.get('/policestations')
}

export const getPollingStations = async () => {
    return handler.get('/pollingstations')
}

export const getWards = async () => {
    return handler.get('/wards')
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
