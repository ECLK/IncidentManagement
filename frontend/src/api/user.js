import handler from './apiHandler';
import * as mockapi from '../data/mockapi';

export const getAllUsers = async () => {
    return mockapi.getUsers();
}