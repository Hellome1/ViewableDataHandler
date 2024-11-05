import axios from 'axios'

const axiosIns = axios.create({
  baseURL: 'https://127.0.0.1',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

axiosIns.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
})

axiosIns.interceptors.response.use(response => {
  return response.data;
}, error => {
  return Promise.reject(error);
})

export default axiosIns