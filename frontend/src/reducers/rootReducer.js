import {CHANGE_LANGUAGE} from '../actions'

const initialState = {
    selectedLanguage: 'si'
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
        default:
            return state
        
    }
}

