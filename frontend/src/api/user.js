import handler from './apiHandler';
import * as mockapi from '../data/mockapi';

export const getAllUsers = async () => {
    return mockapi.getUsers();
}

export const signIn = async (username, password) => {
    // return mockapi.signIn(username, password);
    return handler.post('/auth-jwt/', { username, password })
}