import { CHANGE_LANGUAGE } from './RootTypes'

const initialState = {
    selectedLanguage: 'en',
}

export default function rootReducer(state, action){
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