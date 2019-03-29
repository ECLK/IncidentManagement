import {getCategories} from '../../../api/category'
import { REQUEST_CATAGORIES, REQUEST_CATAGORIES_SUCCESS} from './LandingTypes'

/*
 * action creators
 */

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
        return getCategories()
        .then(
            response => response.data,
            error=> console.log('error occured', error)
        )
        .then(json =>
            dispatch(recieveCatogories(json))
        )
    }
}