
import handler from './apiHandler'

export const getIncidentCatogories = async () => {
    return handler.get('/categorys')
}