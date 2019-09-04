let API_BASE_URL = "https://localhost:8000";

if(process.env.NODE_ENV === 'production'){
    API_BASE_URL = "https://api.incidents.ecstag.opensource.lk";
} 

export {
    API_BASE_URL
}
