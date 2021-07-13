import axios from 'axios';

const api = axios.create({
  baseURL: 'http://darlanbrandt.herokuapp.com/data',
});

export default api;
