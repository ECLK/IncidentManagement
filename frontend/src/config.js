
//change this to the correct url later
var API_BASE_URL = "https://api.incidents.ecdev.opensource.lk";
API_BASE_URL = "http://127.0.0.1:8000";

if(window._env_ && window._env_.API_BASE_URL){
    API_BASE_URL = window._env_.API_BASE;
}

export {
    API_BASE_URL  
} 
