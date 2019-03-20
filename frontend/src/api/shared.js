
import handler from './apiHandler'

export const getIncidentCatogories = async () => {
    return handler.get('/categorys')
}

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