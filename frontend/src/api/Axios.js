import baseAxios from 'axios';
import { getToken } from './JWToken';


// const baseURL = 'http://localhost:8800/api/v1/';
const baseURL = 'http://localhost:8800/api/v1/';

const Axios = baseAxios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

Axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

export default Axios;
