import axios from 'axios';

const api = axios.create({
  baseURL: 'https://is.gd',
});

export default api;
