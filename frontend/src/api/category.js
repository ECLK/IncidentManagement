import handler from './apiHandler'

export const getCategories = async () => {
    return handler.get('/categories');
}

export const createCategory = async (categoryData) => {
    return handler.post('/categories', categoryData);
}

export const getCategory = async (categoryId) => {
    return handler.get(`/categories/${categoryId}`);
}

export const updateCategory = async (categoryId, categoryData) => {
    return handler.put(`/categories/${categoryId}`, categoryData);
}

