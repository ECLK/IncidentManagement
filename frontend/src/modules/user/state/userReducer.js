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
        allIds:[],
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

        let _organizations = {
            byIds:{},
            allIds:[]
        }
        let _divisions = {
            byIds:{},
            allIds:[],
            idsByOrganization: {}
        }
        let _users = {
            byIds:{},
            idsByEntity:{},
            idsByOrganization:{},
            idsByDivision:{},
            allIds:[]
        }

        for(var user of users){
            if(user.profile && user.profile.organization && user.profile.division){
                const { organization, division } = user.profile;

                if(!(organization.code in _organizations.byIds)){
                    _organizations.byIds[organization.code] = organization;
                    _organizations.allIds.push(organization.code);
                }
                if(!(organization.code in _divisions.idsByOrganization)){
                    _divisions.idsByOrganization[organization.code] = [];
                }
                if(!(organization.code in _users.idsByOrganization)){
                    _users.idsByOrganization[organization.code] = []
                }

                if(!(division.code in _divisions.byIds)){
                    _divisions.byIds[division.code] = division;
                    _divisions.allIds.push(division.code);
                    _divisions.idsByOrganization[organization.code].push(division.code)
                }
                if(!(division.code in _users.idsByDivision)){
                    _users.idsByDivision[division.code] = [];
                }
                
                if(!(user.uid in _users)){
                    _users.byIds[user.uid] = user;
                    _users.allIds.push(user.uid);
                    _users.idsByOrganization[organization.code].push(user.uid);
                    _users.idsByDivision[division.code].push(user.uid);
                } 
            }
        }

        state.organizations = _organizations;
        state.divisions = _divisions;
        state.users = _users;

        return state;
    }
})

export default userReducer;