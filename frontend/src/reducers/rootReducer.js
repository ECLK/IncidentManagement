import {CHANGE_LANGUAGE, REQUEST_CATAGORIES, REQUEST_CATAGORIES_SUCCESS} from '../actions'

const initialState = {
    selectedLanguage: 'sinhala',
    isCatogoryFetching: false,
    catogories: []
}

export default function mainApp(state, action){
    if (typeof state === 'undefined') {
        return initialState
    }
    switch(action.type){
        case CHANGE_LANGUAGE:
            return Object.assign({}, state, {
                selectedLanguage: action.selectedLanguage
            })
        case REQUEST_CATAGORIES:
            return Object.assign({}, state, {
                isCatogoryFetching:true
            })
        case REQUEST_CATAGORIES_SUCCESS:
            console.log(action.catogories)
            return Object.assign({}, state, {
                isCatogoryFetching: false,
                catogories:action.catogories
            })
        default:
            return state
        
    }
}

