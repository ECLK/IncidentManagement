import axios from 'axios';
import {API_BASE_URL} from '../config';
import * as localStorage from '../utils/localStorage'

const handler = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

// Add a response interceptor
handler.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger

  // handling session expire
  if (error.response.status != undefined) {
    if (error.response.status == 401 && error.response.data.data.message == "Signature has expired."){
      signOut()
    } else if (error.response.status == 400 && error.response.data.data.non_field_errors.includes("Signature has expired.")){
      signOut()
    }
  } else {
    console.log(error.response);
    console.log("<---- This is an anchor message ---->")
  }
  return Promise.reject(error);
});

const signOut = () => {
  localStorage.remove('ECIncidentManagementUser');
  axios.defaults.headers.common['Authorization'] = null;
  window.location.href = "/sign-in";
}

export default handler;