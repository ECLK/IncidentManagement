
import handler from './apiHandler'

export const getCatogories = async () => {
    // test method
    return handler.get('/categorys')
}

export const postIncidentReport = async (incidentData) => {
    return handler.post('/incident', incidentData)
}

export const getIncidentCatogories = async () => {
    return handler.get('/categorys')
}