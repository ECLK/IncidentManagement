import handler from './apiHandler'

export const getCategories = async () => {
    return handler.get('/categories');
}

export const createCategory = async (categoryData) => {
    return handler.post('/categories', categoryData);
}

export const getCategory = async (CategoryId) => {
    return handler.get(`/categories/${CategoryId}`);
}

export const updateCategory = async (CategoryId, categoryData) => {
    return handler.put(`/categories/${CategoryId}`, categoryData);
}

