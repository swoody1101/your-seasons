import baseAxios from 'axios';
import { getToken } from './JWToken';


const baseURL = 'https://yourseason.ssafy.io/api/v1/';

const Axios = baseAxios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const imgAxios = baseAxios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default Axios;

Axios.interceptors.request.use((config) => {
  if (getToken()) {
    config.headers.Authorization = `Bearer ${getToken()}`;
  }
  return config;
});
