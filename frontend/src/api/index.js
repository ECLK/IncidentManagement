
import handler from './apiHandler'

export const getCatogories = async () => {
    // test method
    return handler.get('/categorys')
}

export const postIncidentReport = async (incidentData) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {data:""}
    // return handler.post('/incident', incidentData)
}

export const getIncidentCatogories = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {data:""}
    return handler.get('/categorys')
}