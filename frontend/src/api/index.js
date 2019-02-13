
import handler from './apiHandler'

export const getCatogories = () => {
    return handler.get('/categorys')
}