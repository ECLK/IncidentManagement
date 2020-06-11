import handler from './apiHandler';
import * as mockapi from '../data/mockapi';

export const getAllUsers = async () => {
    // return mockapi.getUsers();
    return (await handler.get(`/users/`)).data;
}

export const getStaffUsers = async() => {
    return (await handler.get(`/users/?type=staff`)).data;
}

export const signIn = async (username, password) => {
    // return mockapi.signIn(username, password);
    return handler.post('/auth-jwt/', { username, password })
}

export const refreshToken = async (token) => {
    return handler.post('/auth-jwt-refresh/', { token })
}
