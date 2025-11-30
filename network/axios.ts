// axios.ts
import axios from "axios";
export const baseUrl = "https://crystalpoint-api.onrender.com";



export const baseAxios = axios.create({
  baseURL: baseUrl,
  withCredentials:true,
});


baseAxios.interceptors.request.use((config => {
    // if (token) {
    //    config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
}));



  // export {setAuthToken,getAuthToken};