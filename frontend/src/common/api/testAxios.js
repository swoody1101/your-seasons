import baseAxios from 'axios';
import { getToken } from './JWToken';


const baseURL = 'http://localhost:8800/api/';

const testAxios = baseAxios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

testAxios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

export default testAxios;
