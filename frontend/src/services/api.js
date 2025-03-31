import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Asegúrate de que esta URL sea correcta
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  req.headers['Content-Type'] = 'application/json'; // Asegurar encabezado correcto
  return req;
});

export default API;