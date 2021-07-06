import axios from 'axios';
import { Platform } from 'react-native';

import store from '../redux/store';
import { login } from '../redux/userSlice'
import * as RootNavigation from '../screens/RootNavigation';


const url = Platform.OS === 'web' ? 'https://192.168.3.9:44343/api/v1.0/' : 'http://192.168.3.9:29516/api/v1.0/'
const api = axios.create({
  baseURL: url,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

const apiRefresh = axios.create({
  baseURL: url,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  config => {
    const accessToken = store.getState().user.accessToken
    if (accessToken)
      config.headers.Authorization = `Bearer ${accessToken}`

    return config
  },
  error => {
    Promise.reject(error);
});

api.interceptors.response.use(
  response => {
    return response
  }, 
  async error => {
    const originalRequest = error.config;
    if (originalRequest.headers.Authorization && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        let response = await apiRefresh.post('/auth/refresh',
          {
            "accessToken": store.getState().user.accessToken,
            "refreshToken": store.getState().user.refreshToken
          })
        if (response.status === 200) {
          store.dispatch(login({accessToken: response.data.accessToken, refreshToken: response.data.refreshToken}))
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`
          //return originalRequest object with Axios.
          return api(originalRequest);
        }
      }
      catch(ex) {
        RootNavigation.navigate('SignIn');
      }
    }
    // return Error object with Promise
   return Promise.reject(error);
});

export default api;