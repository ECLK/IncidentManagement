import handler from './apiHandler';
import * as mockapi from '../data/mockapi';

export const getComments = async () => {
    // return handler.get('/incident_comments');
}

export const postComment = async (commentData) => {
    // return handler.post('/incident_comments', commentData);
    mockapi.addComment(commentData);
}

export const getComment = async (commentId) => {
    return handler.get(`/incident_comments/${commentId}`);
}

export const updateCategory = async (commentId, commentData) => {
    return handler.put(`/incident_comments/${commentId}`, commentData);
}
