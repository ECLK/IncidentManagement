let API_BASE_URL = "https://api.incidents.ecdev.opensource.lk";

if (process.env.NODE_ENV === "production") {
  API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
}

export { API_BASE_URL };
