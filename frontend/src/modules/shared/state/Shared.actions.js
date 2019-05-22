import {
    REQUEST_INCIDENT_CATAGORIES,
    REQUEST_INCIDENT_CATAGORIES_SUCCESS,
    REQUEST_INCIDENT_CATAGORIES_FAILURE,

    REQUEST_INCIDENT_DISTRICTS,
    REQUEST_INCIDENT_DISTRICTS_SUCCESS,
    REQUEST_INCIDENT_DISTRICTS_FAILURE,

    REQUEST_INCIDENT_POLICE_STATIONS,
    REQUEST_INCIDENT_POLICE_STATIONS_SUCCESS,
    REQUEST_INCIDENT_POLICE_STATIONS_FAILURE,

    REQUEST_INCIDENT_POLLING_STATIONS,
    REQUEST_INCIDENT_POLLING_STATIONS_SUCCESS,
    REQUEST_INCIDENT_POLLING_STATIONS_FAILURE,

    REQUEST_INCIDENT_WARDS,
    REQUEST_INCIDENT_WARDS_SUCCESS,
    REQUEST_INCIDENT_WARDS_FAILURE,

    ACTIVE_INCIDENT_GET_DATA_REQUEST,
    ACTIVE_INCIDENT_GET_DATA_SUCCESS,
    ACTIVE_INCIDENT_GET_DATA_ERROR,

    SIGN_IN_REQUEST, 
    SIGN_IN_REQUEST_SUCCESS,
    SIGN_IN_REQUEST_ERROR,

    TOGGLE_REMEBER_USER,
    SIGN_OUT,
    SIGN_OUT_ERROR,

} from './Shared.types'

import { getIncident, getReporter  } from '../../../api/incident';
import { getDistricts, getPoliceStations, getPollingStations, getWards } from '../../../api/shared';
import { getCategories } from '../../../api/category';
import { signIn } from '../../../data/mockapi';
import * as localStorage from '../../../utils/localStorage';

// Get Catogories

export function requestIncidentCatogories() {
    return {
        type: REQUEST_INCIDENT_CATAGORIES,
    }
}

export function recieveIncidentCatogories(catogories) {
    return {
        type: REQUEST_INCIDENT_CATAGORIES_SUCCESS,
        data: catogories,
        error: null
    }
}

export function recieveIncidentCatogoriesError(errorResponse) {
    return {
        type: REQUEST_INCIDENT_CATAGORIES_FAILURE,
        data: null,
        error: errorResponse
    }
}

export function fetchCatogories(){
    return async function(dispatch){
        dispatch(requestIncidentCatogories());
        try{
            const response = await getCategories();
            await dispatch(recieveIncidentCatogories(response.data));
        }catch(error){
            await dispatch(recieveIncidentCatogoriesError(error));
        }
    }
}


// Get Disticts

export function requestDistricts() {
    return {
        type: REQUEST_INCIDENT_DISTRICTS,
    }
}

export function receiveDistricts(response) {
    return {
        type: REQUEST_INCIDENT_DISTRICTS_SUCCESS,
        data: response,
        error: null
    }
}

export function receiveDistrictsError(errorResponse) {
    return {
        type: REQUEST_INCIDENT_DISTRICTS_FAILURE,
        data: null,
        error: errorResponse
    }
}

export function fetchDistricts(){
    return async function(dispatch){
        dispatch(requestDistricts());
        try{
            const response = await getDistricts();
            await dispatch(receiveDistricts(response.data));
        }catch(error){
            await dispatch(receiveDistrictsError(error));
        }
    }
}

// Get Police stations

export function requestPoliceStations() {
    return {
        type: REQUEST_INCIDENT_POLICE_STATIONS,
    }
}

export function receivePoliceStations(response) {
    return {
        type: REQUEST_INCIDENT_POLICE_STATIONS_SUCCESS,
        data: response,
        error: null
    }
}

export function receivePoliceStationsError(errorResponse) {
    return {
        type: REQUEST_INCIDENT_POLICE_STATIONS_FAILURE,
        data: null,
        error: errorResponse
    }
}

export function fetchPoliceStations(){
    return async function(dispatch){
        dispatch(requestPoliceStations());
        try{
            const response = await getPoliceStations();
            await dispatch(receivePoliceStations(response.data));
        }catch(error){
            await dispatch(receivePoliceStationsError(error));
        }
    }
}

// Get Polling Stations

export function requestPollingStations() {
    return {
        type: REQUEST_INCIDENT_POLLING_STATIONS,
    }
}

export function receivePollingStations(response) {
    return {
        type: REQUEST_INCIDENT_POLLING_STATIONS_SUCCESS,
        data: response,
        error: null
    }
}

export function receivePollingStationsError(errorResponse) {
    return {
        type: REQUEST_INCIDENT_POLLING_STATIONS_FAILURE,
        data: null,
        error: errorResponse
    }
}

export function fetchPollingStations(){
    return async function(dispatch){
        dispatch(requestPollingStations());
        try{
            const response = await getPollingStations();
            await dispatch(receivePollingStations(response.data));
        }catch(error){
            await dispatch(receivePollingStationsError(error));
        }
    }
}


// Get Wards

export function requestWards() {
    return {
        type: REQUEST_INCIDENT_WARDS,
    }
}

export function receiveWards(response) {
    return {
        type: REQUEST_INCIDENT_WARDS_SUCCESS,
        data: response,
        error: null
    }
}

export function receiveWardsError(errorResponse) {
    return {
        type: REQUEST_INCIDENT_WARDS_FAILURE,
        data: null,
        error: errorResponse
    }
}

export function fetchWards(){
    return async function(dispatch){
        dispatch(requestWards());
        try{
            const response = await getWards();
            await dispatch(receiveWards(response.data));
        }catch(error){
            await dispatch(receiveWardsError(error));
        }
    }
}


// get active incident data

export function requestActiveIncidentData() {
    return {
        type: ACTIVE_INCIDENT_GET_DATA_REQUEST,
    }
}

export function getActiveIncidentDataSuccess(response) {
    return {
        type: ACTIVE_INCIDENT_GET_DATA_SUCCESS,
        data: response,
        error: null
    }
}

export function getActiveIncidentDataError(errorResponse) {
    return {
        type: ACTIVE_INCIDENT_GET_DATA_ERROR,
        data: null,
        error: errorResponse
    }
}

export function fetchActiveIncidentData(incidentId) {
    return async function (dispatch) {
        dispatch(requestActiveIncidentData(incidentId));
        try{
            const responseIncident = await getIncident(incidentId);
            const responseReporter = await getReporter(responseIncident.data.reporterId);
            dispatch(getActiveIncidentDataSuccess({
                "incident": responseIncident.data,
                "reporter": responseReporter.data
            }));
        }catch(error){
            console.log(error);
            dispatch(getActiveIncidentDataError(error));
        }
    }
}


// SIGN IN

export function requestSignIn() {
    return {
        type: SIGN_IN_REQUEST,
    }
}

export function requestSignInSuccess(response) {
    return {
        type: SIGN_IN_REQUEST_SUCCESS,
        data: response,
        error: null
    }
}

export function requestSignInError(errorResponse) {
    return {
        type: SIGN_IN_REQUEST_ERROR,
        data: null,
        error: errorResponse
    }
}

export function fetchSignIn(userName, password) {
    return async function (dispatch, getState) {
        dispatch(requestSignIn());
        try{
            let signInData = null;
            signInData = localStorage.read('ECIncidentManagementUser');
            if(!signInData){
                signInData = await signIn(userName, password);
                if(getState().sharedReducer.signedInUser.rememberMe){
                    localStorage.write('ECIncidentMangementUser', signInData);
                }
            }    
            dispatch(requestSignInSuccess(signInData));
        }catch(error){
            dispatch(getActiveIncidentDataError(error));
        }
    }
}

//Remeber user
export function toggleRememberUser(){
    return {
        type: TOGGLE_REMEBER_USER,
        data:null,
        error:null
    }
}

//sign out

export function signOut() {
    return {
        type: SIGN_OUT
    }
}

export function signOutError(error) {
    return {
        type: SIGN_OUT_ERROR,
        error: error
    }
}

export function initiateSignOut() {
    return async function (dispatch, getState) {
        try{
            localStorage.remove('ECIncidentMangementUser');
            dispatch(signOut())
        }catch(error){
            dispatch(signOutError(error));
        }
    }
}