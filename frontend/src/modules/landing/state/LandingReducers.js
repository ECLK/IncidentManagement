import { REQUEST_CATAGORIES, REQUEST_CATAGORIES_SUCCESS} from './LandingTypes'

const initialState = {
    isCatogoryFetching:false,
    catogories:[]
}

export default function landingReducer(state, action){
    if (typeof state === 'undefined') {
        return initialState
    }
    switch(action.type){
        case REQUEST_CATAGORIES:
            return Object.assign({}, state, {
                isCatogoryFetching:true
            })
        case REQUEST_CATAGORIES_SUCCESS:
            return Object.assign({}, state, {
                isCatogoryFetching: false,
                catogories:action.catogories
            })
        default:
            return state
        
    }
}

