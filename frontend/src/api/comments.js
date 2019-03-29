import handler from './apiHandler'

export const getComments = async () => {
    return handler.get('/incident_comments');
}

export const createComment = async (commentData) => {
    return handler.post('/incident_comments', commentData);
}

export const getComment = async (commentId) => {
    return handler.get(`/incident_comments/${commentId}`);
}

export const updateCategory = async (commentId, commentData) => {
    return handler.put(`/incident_comments/${commentId}`, commentData);
}
