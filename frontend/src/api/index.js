
import handler from './apiHandler'

export const getCatogories = async () => {
    return handler.get('/categorys')
}

export const postIncidentReport = async (incidentData) => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return {data:""}
    // return handler.post('/incident', incidentData)
}

export const getIncidentCatogories = async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return {data:['cat1', 'cat2', 'cat3']}
    // return handler.post('/incident', incidentData)
}