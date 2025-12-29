// axios.ts
import axios, { AxiosError, isAxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
export const baseUrl = "https://crystalpoint-api.onrender.com";
interface customError {
  response: {
    data: {
      error: string;
    };
  };
}

export const baseAxios = axios.create({
  baseURL: baseUrl,
  // withCredentials:true
});

export const baseAxiosPatch = axios.create({
  baseURL: baseUrl,
  withCredentials:true
});

export const baseAxiosDelete = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});





baseAxios.interceptors.request.use((config) => {
  return config;
});

const axiosError = (error: customError | unknown) => {
  const msg = (error as customError)?.response?.data?.error;
  console.log((error as customError)?.response?.data);
  enqueueSnackbar(msg, { variant: "error" });
  return msg;
};

export { axiosError };

// export {setAuthToken,getAuthToken};
