import axios from 'axios';

/*export const key = 'fce67b4737f93f3019e73ef18c7e92f715a823c8';

const api = axios.create({
  baseURL: 'https://api-ssl.bitly.com/v4',
  headers: {
    Authorization: `Bearer ${key}`,
  },
});*/

const api = axios.create({
  baseURL: 'https://is.gd',
});

export default api;
