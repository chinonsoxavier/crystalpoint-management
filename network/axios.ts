// axios.ts
import axios, { AxiosError, isAxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
export const baseUrl = "https://crystalpoint-api.onrender.com";
interface customError {
  response:{
    data:{
      message:string
    }
  }
}


export const baseAxios = axios.create({
  baseURL: baseUrl,
});


baseAxios.interceptors.request.use((config => {
    // if (token) {
    //    config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
}));

const axiosError = (error:customError | unknown )=>{
    const msg = (error as customError)?.response?.data?.message;
    console.log((error as customError)?.response?.data);
    enqueueSnackbar(msg, { variant: "error" });
    return msg;
}

export {axiosError}



  // export {setAuthToken,getAuthToken};