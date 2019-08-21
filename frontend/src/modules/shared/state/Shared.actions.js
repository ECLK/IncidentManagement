import axios from 'axios';

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

    CHANGE_LANGUAGE,

    RESET_ACTIVE_INCIDENT,

    REQUEST_INCIDENT_DS_DIVISIONS,
    REQUEST_INCIDENT_DS_DIVISIONS_SUCCESS,
    REQUEST_INCIDENT_DS_DIVISIONS_FAILURE,

} from './Shared.types'

import { getIncident, getReporter  } from '../../../api/incident';
import { getCategories, getDistricts, getPoliceStations, getPollingStations, getWards, getDSDivisions } from '../../../api/shared';
import { signIn } from '../../../api/user';
import * as localStorage from '../../../utils/localStorage';

// Get Catogories

export function requestIncidentCatogories() {
    return {
        type: REQUEST_INCIDENT_CATAGORIES,
        isLoading: true
    }
}

export function recieveIncidentCatogories(catogories) {
    return {
        type: REQUEST_INCIDENT_CATAGORIES_SUCCESS,
        data: catogories,
        error: null,
        isLoading: false
    }
}

export function recieveIncidentCatogoriesError(errorResponse) {
    return {
        type: REQUEST_INCIDENT_CATAGORIES_FAILURE,
        data: null,
        error: errorResponse,
        isLoading: false
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
        isLoading: true
    }
}

export function receiveDistricts(response) {
    return {
        type: REQUEST_INCIDENT_DISTRICTS_SUCCESS,
        data: response,
        error: null,
        isLoading: false
    }
}

export function receiveDistrictsError(errorResponse) {
    return {
        type: REQUEST_INCIDENT_DISTRICTS_FAILURE,
        data: null,
        error: errorResponse,
        isLoading: false
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
        isLoading: true
    }
}

export function receivePoliceStations(response) {
    return {
        type: REQUEST_INCIDENT_POLICE_STATIONS_SUCCESS,
        data: response,
        error: null,
        isLoading: false
    }
}

export function receivePoliceStationsError(errorResponse) {
    return {
        type: REQUEST_INCIDENT_POLICE_STATIONS_FAILURE,
        data: null,
        error: errorResponse,
        isLoading: false
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
        isLoading: true
    }
}

export function receivePollingStations(response) {
    return {
        type: REQUEST_INCIDENT_POLLING_STATIONS_SUCCESS,
        data: response,
        error: null,
        isLoading: false
    }
}

export function receivePollingStationsError(errorResponse) {
    return {
        type: REQUEST_INCIDENT_POLLING_STATIONS_FAILURE,
        data: null,
        error: errorResponse,
        isLoading: false
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

// Get DS Divisions

export function requestDSDivisions() {
    return {
        type: REQUEST_INCIDENT_DS_DIVISIONS,
        isLoading: true
    }
}

export function receiveDSDivisions(response) {
    return {
        type: REQUEST_INCIDENT_DS_DIVISIONS_SUCCESS,
        data: response,
        error: null,
        isLoading: false
    }
}

export function receiveDSDivisionsError(errorResponse) {
    return {
        type: REQUEST_INCIDENT_DS_DIVISIONS_FAILURE,
        data: null,
        error: errorResponse,
        isLoading: false
    }
}

export function fetchDSDivisions(){
    return async function(dispatch){
        dispatch(requestDSDivisions());
        try{
            const response = await getDSDivisions();
            await dispatch(receiveDSDivisions(response.data));
        }catch(error){
            await dispatch(receiveDSDivisionsError(error));
        }
    }
}

// Get Wards

export function requestWards() {
    return {
        type: REQUEST_INCIDENT_WARDS,
        isLoading: true
    }
}

export function receiveWards(response) {
    return {
        type: REQUEST_INCIDENT_WARDS_SUCCESS,
        data: response,
        error: null,
        isLoading: false
    }
}

export function receiveWardsError(errorResponse) {
    return {
        type: REQUEST_INCIDENT_WARDS_FAILURE,
        data: null,
        error: errorResponse,
        isLoading: false
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
        isLoading: true
    }
}

export function getActiveIncidentDataSuccess(response) {
    return {
        type: ACTIVE_INCIDENT_GET_DATA_SUCCESS,
        data: response,
        error: null,
        isLoading: false
    }
}

export function getActiveIncidentDataError(errorResponse) {
    return {
        type: ACTIVE_INCIDENT_GET_DATA_ERROR,
        data: null,
        error: errorResponse,
        isLoading: false
    }
}

export function fetchActiveIncidentData(incidentId) {
    return async function (dispatch) {
        dispatch(requestActiveIncidentData(incidentId));
        try{
            const responseIncident = await getIncident(incidentId);
            const responseReporter = await getReporter(responseIncident.data.reporter);
            dispatch(getActiveIncidentDataSuccess({
                "incident": responseIncident.data,
                "reporter": responseReporter.data
            }));
        }catch(error){
            dispatch(getActiveIncidentDataError(error));
        }
    }
}


// SIGN IN

export function requestSignIn() {
    return {
        type: SIGN_IN_REQUEST,
        isLoading: true
    }
}

export function requestSignInSuccess(response) {
    return {
        type: SIGN_IN_REQUEST_SUCCESS,
        data: response,
        error: null,
        isLoading: false
    }
}

export function requestSignInError(errorResponse) {
    return {
        type: SIGN_IN_REQUEST_ERROR,
        data: null,
        error: errorResponse,
        isLoading: false
    }
}

export function fetchSignIn(userName, password) {

    return async function (dispatch, getState) {
        dispatch(requestSignIn());
        try{
            let signInData = null;
            signInData = localStorage.read('ECIncidentManagementUser');
            let token = null;

            if(!signInData){
                signInData = (await signIn(userName, password)).data;
                
                if(signInData.status === "success"){
                    if(getState().sharedReducer.signedInUser.rememberMe){
                        localStorage.write('ECIncidentManagementUser', signInData.data);
                        token = signInData.data.token;
                    }
                }else{
                    dispatch(requestSignInError(signInData.message));
                }
            }else{
                token = signInData.token;
            }   
            console.log(signInData, token);
            axios.defaults.headers.common['Authorization'] = "JWT " + token;
            dispatch(requestSignInSuccess(signInData.data));
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
            localStorage.remove('ECIncidentManagementUser');
            axios.defaults.headers.common['Authorization'] = null;
            dispatch(signOut())
        }catch(error){
            dispatch(signOutError(error));
        }
    }
}

//change langguage
export function changeLanguage(selectedLanguage) {
    return {
        type: CHANGE_LANGUAGE,
        selectedLanguage
    }
}

export function resetActiveIncident(){
    return {
        type: RESET_ACTIVE_INCIDENT
    }
}