import axios from 'axios';
import { createAction } from 'redux-starter-kit';

import {

    REQUEST_INCIDENT_CHANNELS,
    REQUEST_INCIDENT_CHANNELS_SUCCESS,
    REQUEST_INCIDENT_CHANNELS_FAILURE,

    REQUEST_INCIDENT_ELECTIONS,
    REQUEST_INCIDENT_ELECTIONS_SUCCESS,
    REQUEST_INCIDENT_ELECTIONS_FAILURE,

    REQUEST_INCIDENT_CATAGORIES,
    REQUEST_INCIDENT_CATAGORIES_SUCCESS,
    REQUEST_INCIDENT_CATAGORIES_FAILURE,

    REQUEST_INCIDENT_INSTITUTIONS,
    REQUEST_INCIDENT_INSTITUTIONS_SUCCESS,
    REQUEST_INCIDENT_INSTITUTIONS_FAILURE,

    REQUEST_INCIDENT_PROVINCES,
    REQUEST_INCIDENT_PROVINCES_SUCCESS,
    REQUEST_INCIDENT_PROVINCES_FAILURE,

    REQUEST_INCIDENT_DISTRICTS,
    REQUEST_INCIDENT_DISTRICTS_SUCCESS,
    REQUEST_INCIDENT_DISTRICTS_FAILURE,

    REQUEST_INCIDENT_DIVISIONAL_SECRETARIATS,
    REQUEST_INCIDENT_DIVISIONAL_SECRETARIATS_SUCCESS,
    REQUEST_INCIDENT_DIVISIONAL_SECRETARIATS_FAILURE,

    REQUEST_INCIDENT_GRAMA_NILADHARIS,
    REQUEST_INCIDENT_GRAMA_NILADHARIS_SUCCESS,
    REQUEST_INCIDENT_GRAMA_NILADHARIS_FAILURE,

    REQUEST_INCIDENT_POLLING_STATIONS,
    REQUEST_INCIDENT_POLLING_STATIONS_SUCCESS,
    REQUEST_INCIDENT_POLLING_STATIONS_FAILURE,

    REQUEST_INCIDENT_POLLING_DIVISIONS,
    REQUEST_INCIDENT_POLLING_DIVISIONS_SUCCESS,
    REQUEST_INCIDENT_POLLING_DIVISIONS_FAILURE,

    REQUEST_INCIDENT_POLICE_STATIONS,
    REQUEST_INCIDENT_POLICE_STATIONS_SUCCESS,
    REQUEST_INCIDENT_POLICE_STATIONS_FAILURE,

    REQUEST_INCIDENT_POLICE_DIVISIONS,
    REQUEST_INCIDENT_POLICE_DIVISIONS_SUCCESS,
    REQUEST_INCIDENT_POLICE_DIVISIONS_FAILURE,

    REQUEST_INCIDENT_WARDS,
    REQUEST_INCIDENT_WARDS_SUCCESS,
    REQUEST_INCIDENT_WARDS_FAILURE,

    REQUEST_INCIDENT_POLITICAL_PARTIES,
    REQUEST_INCIDENT_POLITICAL_PARTIES_SUCCESS,
    REQUEST_INCIDENT_POLITICAL_PARTIES_FAILURE,

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

} from './Shared.types'

import { getIncident, getReporter  } from '../../api/incident';
import {
    getChannels,
    getElections,
    getCategories,
    getInstitutions,
    getProvinces,
    getDistricts,
    getDivisionalSecretariats,
    getGramaNiladharis,
    getPollingStations,
    getPollingDivisions,
    getPoliceStations,
    getPoliceDivisions,
    getWards,
    getPoliticalParties
} from '../../api/shared';
import { signIn } from '../../api/user';
import * as localStorage from '../../utils/localStorage';


// get channels

export function requestIncidentChannels() {
    return {
        type: REQUEST_INCIDENT_CHANNELS
    }
}

export function receiveIncidentChannels(channels) {
    return {
        type: REQUEST_INCIDENT_CHANNELS_SUCCESS,
        data: channels,
        error: null
    }
}

export function receiveIncidentChannelsError(errorResponse) {
    return {
        type: REQUEST_INCIDENT_CHANNELS_FAILURE,
        data: null,
        error: errorResponse
    }
}

export function fetchChannels() {
    return async function(dispatch) {
        dispatch(requestIncidentChannels());
        try {
            const response = await getChannels();
            await dispatch(receiveIncidentChannels(response.data));
        } catch (error) {
            await dispatch(receiveIncidentChannels(error));
        }
    }
}

// Get Elections
export function requestIncidentElections() {
    return {
        type: REQUEST_INCIDENT_ELECTIONS
    };
}

export function receiveIncidentElections(elections) {
    return {
        type: REQUEST_INCIDENT_ELECTIONS_SUCCESS,
        data: elections,
        error: null
    }
}

export function receiveIncidentElectionsError(errorResponse) {
    return {
        type: REQUEST_INCIDENT_ELECTIONS_FAILURE,
        data: null,
        error: errorResponse
    }
}

export function fetchElections() {
    return async function(dispatch) {
        dispatch(requestIncidentElections())
        try {
            const response = await getElections();
            await dispatch(receiveIncidentElections(response.data));
        } catch (error) {
            await dispatch(receiveIncidentElectionsError(error));
        }
    }
}

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

export function fetchCategories(){
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


// Institutions

export function requestIncidentInstitutions() {
    return {
        type: REQUEST_INCIDENT_INSTITUTIONS,
    };
}

export function receiveIncidentInstitutions(institutions) {
    return {
        type: REQUEST_INCIDENT_INSTITUTIONS_SUCCESS,
        data: institutions,
        error: null
    };
}

export function receiveIncidentInstitutionsError(errorResponse) {
    return {
        type: REQUEST_INCIDENT_INSTITUTIONS_FAILURE,
        data: null,
        error: errorResponse
    };
}

export function fetchInstitutions() {
    return async function(dispatch){
        dispatch(requestIncidentInstitutions());
        try {
            const response = await getInstitutions();
            await dispatch(receiveIncidentInstitutions(response.data));
        } catch(error) {
            await dispatch(receiveIncidentInstitutionsError(error));
        }
    };
}


// Provinces

export function requestIncidentProvinces() {
    return {
        type: REQUEST_INCIDENT_PROVINCES,
    };
}

export function receiveIncidentProvinces(provinces) {
    return {
        type: REQUEST_INCIDENT_PROVINCES_SUCCESS,
        data: provinces,
        error: null
    };
}

export function receiveIncidentProvincesError(errorResponse) {
    return {
        type: REQUEST_INCIDENT_PROVINCES_FAILURE,
        data: null,
        error: errorResponse
    };
}

export function fetchProvinces() {
    return async function(dispatch){
        dispatch(requestIncidentProvinces());
        try {
            const response = await getProvinces();
            await dispatch(receiveIncidentProvinces(response.data));
        } catch(error) {
            await dispatch(receiveIncidentProvincesError(error));
        }
    };
}


// Get Disticts

export function requestIncidentDistricts() {
    return {
        type: REQUEST_INCIDENT_DISTRICTS,
        isLoading: true
    }
}

export function receiveIncidentDistricts(response) {
    return {
        type: REQUEST_INCIDENT_DISTRICTS_SUCCESS,
        data: response,
        error: null,
        isLoading: false
    }
}

export function receiveIncidentDistrictsError(errorResponse) {
    return {
        type: REQUEST_INCIDENT_DISTRICTS_FAILURE,
        data: null,
        error: errorResponse,
        isLoading: false
    }
}

export function fetchDistricts(){
    return async function(dispatch){
        dispatch(requestIncidentDistricts());
        try{
            const response = await getDistricts();
            await dispatch(receiveIncidentDistricts(response.data));
        }catch(error){
            await dispatch(receiveIncidentDistrictsError(error));
        }
    }
}


// divisionalSecretariats

export function requestDivisionalSecretariats() {
    return {
        type: REQUEST_INCIDENT_DIVISIONAL_SECRETARIATS,
        isLoading: true
    }
}

export function receiveDivisionalSecretariats(response) {
    return {
        type: REQUEST_INCIDENT_DIVISIONAL_SECRETARIATS_SUCCESS,
        data: response,
        error: null,
        isLoading: false
    }
}

export function receiveDivisionalSecretariatsError(errorResponse) {
    return {
        type: REQUEST_INCIDENT_DIVISIONAL_SECRETARIATS_FAILURE,
        data: null,
        error: errorResponse,
        isLoading: false
    }
}

export function fetchDivisionalSecretariats() {
    return async function(dispatch) {
        dispatch(requestDivisionalSecretariats());
        try {
            const response = await getDivisionalSecretariats();
            dispatch(receiveDivisionalSecretariats(response.data));
        } catch (error) {
            dispatch(receiveDivisionalSecretariatsError(error));
        }
    }
}


// get Grama Niladharis

export function requestGramaNiladharis() {
    return {
        type: REQUEST_INCIDENT_GRAMA_NILADHARIS
    }
}

export function receiveGramaNiladharis(response) {
    return {
        type: REQUEST_INCIDENT_GRAMA_NILADHARIS_SUCCESS,
        data: response,
        error: null
    }
}

export function receiveGramaNiladharisError(errorResponse) {
    return {
        type: REQUEST_INCIDENT_GRAMA_NILADHARIS_FAILURE,
        data: null,
        error: errorResponse
    }
}

export function fetchGramaNiladharis() {
    return async function(dispatch) {
        dispatch(requestGramaNiladharis());
        try {
            const response = await getGramaNiladharis();
            await dispatch(receiveGramaNiladharis(response.data));
        } catch (error) {
            await dispatch(receiveGramaNiladharisError(error));
        }
    }
}

// Get Polling Divisions

export function requestPollingDivisions() {
    return {
        type: REQUEST_INCIDENT_POLLING_DIVISIONS,
    }
}

export function receivePollingDivisions(response) {
    return {
        type: REQUEST_INCIDENT_POLLING_DIVISIONS_SUCCESS,
        data: response,
        error: null
    }
}

export function receivePollingDivisionsError(errorResponse) {
    return {
        type: REQUEST_INCIDENT_POLLING_DIVISIONS_FAILURE,
        data: null,
        error: errorResponse
    }
}

export function fetchPollingDivisions(){
    return async function(dispatch){
        dispatch(requestPollingDivisions());
        try{
            const response = await getPollingDivisions();
            await dispatch(receivePollingDivisions(response.data));
        }catch(error){
            await dispatch(receivePollingDivisionsError(error));
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


// police divisions

export function requestPoliceDivisions() {
    return {
        type: REQUEST_INCIDENT_POLICE_DIVISIONS,
        isLoading: true
    }
}

export function receivePoliceDivisions(response) {
    return {
        type: REQUEST_INCIDENT_POLICE_DIVISIONS_SUCCESS,
        data: response,
        error: null,
        isLoading: false
    }
}

export function receivePoliceDivisionsError(errorResponse) {
    return {
        type: REQUEST_INCIDENT_POLICE_DIVISIONS_FAILURE,
        data: null,
        error: errorResponse,
        isLoading: false
    }
}

export function fetchPoliceDivisions(){
    return async function(dispatch){
        dispatch(requestPoliceDivisions());
        try {
            const response = await getPoliceDivisions();
            await dispatch(receivePoliceDivisions(response.data));
        } catch (error) {
            await dispatch(receivePoliceDivisionsError(error));
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



// get political parties

export function requestPoliticalParties(){
    return {
        type: REQUEST_INCIDENT_POLITICAL_PARTIES,
        isLoading: true
    }
}

export function receivePoliticalParties(response){
    return {
        type: REQUEST_INCIDENT_POLITICAL_PARTIES_SUCCESS,
        data: response,
        error: null,
        isLoading: false
    }
}

export function receivePoliticalPatiesError(errorResponse){
    return {
        type: REQUEST_INCIDENT_POLITICAL_PARTIES_FAILURE,
        data: null,
        error: errorResponse,
        isLoading: false
    }
}

export function fetchPoliticalParties(){
    return async function(dispatch) {
        dispatch(requestPoliticalParties());
        try {
            const response = await getPoliticalParties();
            await dispatch(receivePoliticalParties(response.data));
        } catch (error) {
            await dispatch(receivePoliticalPatiesError(error));
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

                if(signInData.data.token != ""){
                    if(getState().shared.signedInUser.rememberMe){
                        localStorage.write('ECIncidentManagementUser', signInData.data);
                        token = signInData.data.token;
                    }
                }else{
                    dispatch(requestSignInError({message:"Invalid username or password"}));
                }
            }else{
                token = signInData.token;
            }
            axios.defaults.headers.common['Authorization'] = "JWT " + token;
            dispatch(requestSignInSuccess(signInData.data));
        }catch(error){
            dispatch(requestSignInError({message:"Invalid username or password"}));
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