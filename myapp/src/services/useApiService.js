import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  requestSent,
  requestFailed,
  responseReceived,
} from "../store/slices/utilSlice";

const useApiServices = () => {
  const dispatch = useDispatch();
  // const { userData } = useSelector((state) => state.userData);
  const [loading, setLoading] = useState(false);

  const baseUrl = "http://localhost:8000/api"; // Replace with your base URL

  const instance = axios.create({
    baseURL: baseUrl,
  });

  // let token = userData?.access_token
    

  instance.interceptors.request.use(
    (config) => {
      setLoading(true);
      dispatch(requestSent());
        // config.headers.Authorization = `Bearer ${token}`;
    
      return config;
    },
    (error) => {
      setLoading(false);
      dispatch(requestFailed());
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      setLoading(false);
      dispatch(responseReceived());
      return response.data;
    },
    (error) => {
      setLoading(false);
      dispatch(requestFailed());
      return Promise.reject(error);
    }
  );

  const apiPost = async (url, payload) => {
    try {
      const response = await instance.post(url, payload);
      return response;
    } catch (error) {
      console.error("Error sending:", error);
      throw error;
    }
  };


  const apiGet = async (url) => {
    // console.log(url);
    try {
      const response = await instance.get(url);

      return response;
    } catch (error) {
      console.error("Error receiving:", error.message);
      throw error;
    }
  };

  const apiPut = async (url, payload) => {
    try {
      const response = await instance.put(url, payload);
      return response;
    } catch (error) {
      console.error("Error sending:", error);
    }
  };

  const apiDelete = async (url) => {
    try {
      const response = await instance.delete(url);
      return response;
    } catch (error) {
      console.error("Error sending:", error);
    }
  };


  // Define other API service functions here...

  return {
    loading,
    apiPost,
    apiGet,
    apiPut,
    apiDelete
    // Other API service functions
  };
};

export default useApiServices;
