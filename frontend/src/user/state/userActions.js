import { createAction } from 'redux-starter-kit';
import * as userApi from '../../api/user';


//load users
export const loadUsersRequest = createAction('USER/GET_USERS_REQUEST');
export const loadUsersSuccess = createAction('USER/GET_USERS_SUCCESS');
export const loadUsersError = createAction('USER/GET_USERS_ERROR');

export const loadUsers = (userType='all') => {
    return async function(dispatch) {
        dispatch(loadUsersRequest());
        try{
            let response;
            switch(userType){
                case 'all':
                    response = await userApi.getAllUsers();
                    break
                default:
                    response = {data:[]}
            }
            dispatch(loadUsersSuccess({data:response.data}));
        }catch(error){
            console.log(error);
            dispatch(loadUsersError(error));
        }
    }
}