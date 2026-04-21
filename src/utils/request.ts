import axios from "axios";
import {ElMessage} from "element-plus";
const service = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // You can add authorization headers or other configurations here

    const token = localStorage.getItem("token");
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const {data, config} = response;
    if (data.code === "200") {
      return data.data;
    } else {
      if (data.code === "-1") {
        if (config.url !== "/auth/login") {
          localStorage.removeItem("token");
          localStorage.removeItem("");
          window.location.href = "/auth/login";
          ElMessage.error("Session expired, please log in again");
        }
      } else {
        ElMessage.error(data.message || "Error");
        return Promise.reject("Error: " + (data.message || "Unknown error"));
      }
    }
    // You can handle global response processing here
    return response.data;
  },
  (error) => {
    // You can handle global error processing here
    return Promise.reject(error);
  },
);

export default service;
