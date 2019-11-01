import { createReducer } from 'redux-starter-kit';

import {
    loadUsersRequest,
    loadUsersSuccess,
    loadUsersError
} from './userActions'

const initialState = {
    organizations: {
        byIds:{},
        allIds:[]
    },
    divisions: {
        byIds:{},
        idsByOrganization: {}
    },
    users : {
        byIds:{},
        idsByEntity:{},
        allIds:[]
    },
    groups : {
        byIds:{},
        allIds:[]
    }
}

const userReducer = createReducer(initialState, {
    [loadUsersSuccess] : (state, action) => {
        let transformedData = {
            byIds: {},
            idsByEntity: {},
            allIds: []
        };
        let users  = action.payload.data
        users.reduce(
            (accumulator, currUser) => {
                if(currUser.entity){

                    //adding user to all user cache
                    transformedData.byIds[currUser.uid] = currUser;
                    transformedData.allIds.push(currUser.uid);

                    let groupId = currUser.entity.gid;
                    let userId = currUser.uid
                    if(groupId in transformedData.idsByEntity){
                        transformedData.idsByEntity[groupId].push(userId);
                    }else{
                        //occurance of a new group

                        //adding new group to groups
                        state.groups.byIds[groupId] = currUser.entity;
                        state.groups.allIds.push(groupId);

                        //group user by new group.
                        transformedData.idsByEntity[groupId] = [userId];
                    }
                }
            },
            0 //this is starting index for the reduce function. defaults to 1.
        )
        state.users = transformedData;
        return state;
    }
})

export default userReducer;