import { CHANGE_LANGUAGE } from './RootTypes'

const initialState = {
    selectedLanguage: 'si',
}

export default function rootReducer(state, action){
    if (typeof state === 'undefined') {
        console.log(initialState)
        return initialState
    }
    switch(action.type){
        case CHANGE_LANGUAGE:
            console.log(action.selectedLanguage)
            return Object.assign({}, state, {
                selectedLanguage: action.selectedLanguage
            })
        default:
            return state
        
    }
}