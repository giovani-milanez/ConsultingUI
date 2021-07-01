import axios from 'axios';
import { useAppSelector } from '../redux/hooks';



const api = axios.create({
  baseURL: 'http://192.168.3.9:29516/api/v1.0/',
  timeout: 3000
});

// api.interceptors.request.use(config => {
//   debugger
//   const accessToken = useAppSelector(state => state.user.accessToken)
//   if (accessToken)
//     config.headers.Authorization = `Bearer ${accessToken}`;

//   return config
// });

export default api;