import axios from "axios";
import { BaseUrl } from "../../constant/BaseUrl";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const errorNotification = (message) => toast.error(message);

const adminAxiosInstance = axios.create({
    baseURL: BaseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})

adminAxiosInstance.interceptors.request.use(
    config => {
      const jwt = Cookies.get('adminjwt');
  
      if (jwt) {
        config.headers['Authorization'] = jwt;
      }
  
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

export default adminAxiosInstance