import { 
    GET_ALL_INITIAL_INCIDENTS_REQUEST, 
    GET_ALL_INITIAL_INCIDENTS_SUCCESS, 
    GET_ALL_INITIAL_INCIDENTS_FAILED} from './ReviewIncident.types'

const initialState = {
    initialIncidentsData:{
        payloadStatus : "INIT", //REQUESTING, SUCCESS, FAILED
        payload : {}
    }
}

export default function incidentReducer(state, action){
    if (typeof state === 'undefined') {
        return initialState
    }
    switch(action.type){
        case GET_ALL_INITIAL_INCIDENTS_REQUEST:
            return Object.assign({}, state, {
                initialIncidentsData:{
                    payloadStatus : "REQUESTING", //REQUESTING, SUCCESS, FAILED
                    payload : {}
                }
            })
        case GET_ALL_INITIAL_INCIDENTS_SUCCESS:
            return Object.assign({}, state, {
                initialIncidentsData:{
                    payloadStatus : "SUCCESS", //REQUESTING, SUCCESS, FAILED
                    payload : action.payload
                }
            })
        case GET_ALL_INITIAL_INCIDENTS_FAILED:
            return Object.assign({}, state, {
                initialIncidentsData:{
                    payloadStatus : "FAILED", //REQUESTING, SUCCESS, FAILED
                    payload : {}
                }
            })
        default:
            return state
        
    }
}