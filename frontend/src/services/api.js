import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Asegúrate de que esta URL sea correcta
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export default API;