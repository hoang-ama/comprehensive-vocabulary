import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.198:4000/api', // thay localhost bằng IP thật
});

export default api;
