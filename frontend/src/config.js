
//change this to the correct url later
var API_BASE_URL = "http://localhost:5000";

if(window._env_ && window._env_.API_BASE_URL){
    API_BASE_URL = window._env_.API_BASE;
}

export {
    API_BASE_URL  
} 
