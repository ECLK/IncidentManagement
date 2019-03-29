import handler from './apiHandler'

export const getCatogories = async () => {
    return handler.get('/categorys');
}
