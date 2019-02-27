
import handler from './apiHandler'

export const getCatogories = () => {
    return handler.get('/categorys')
}

export const postIncidentReport = (incidentData) => {
    return handler.post('/incident', incidentData)
}