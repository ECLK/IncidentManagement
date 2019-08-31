let API_BASE_URL = "http://127.0.0.1:8000";

if(process.env.NODE_ENV === 'development'){
    API_BASE_URL = "https://api.incidents.ecdev.opensource.lk/"
} else if (process.env.NODE_ENV === 'staging'){
    API_BASE_URL = "https://api.incidents.ecstag.opensource.lk"
}

export {
    API_BASE_URL  
}