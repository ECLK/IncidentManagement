
import {getCatogories} from '../api'


/*
 * action types
 */

 export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
 export const REQUEST_CATAGORIES = 'REQUEST_CATAGORIES';
 export const REQUEST_CATAGORIES_SUCCESS = 'REQUEST_CATAGORIES_SUCCESS';
 export const REQUEST_CATAGORIES_FAILURE = 'REQUEST_CATAGORIES_FAILURE';





 /*
 * action creators
 */

export function changeLanguage(selectedLanguage) {
    return {
        type: CHANGE_LANGUAGE,
        selectedLanguage
    }
}

export function requestCatogories() {
    return {
        type: REQUEST_CATAGORIES,
    }
}

export function recieveCatogories(catogories) {
    return {
        type: REQUEST_CATAGORIES_SUCCESS,
        catogories
    }
}


/**
 * test thunk action creator
 */
export function fetchCatogories(){
    return function(dispatch){
        dispatch(requestCatogories());
        return getCatogories()
        .then(
            response => response.data,
            error=> console.log('error occured', error)
        )
        .then(json =>
            dispatch(recieveCatogories(json))
        )
    }
}