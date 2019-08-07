let API_BASE_URL = "http://127.0.0.1:8000";

if(process.env.NODE_ENV === 'production'){
    API_BASE_URL = "https://api.incidents.ecdev.opensource.lk/"
}

export {
    API_BASE_URL  
}