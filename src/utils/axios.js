import axios from "axios";
import { message } from "antd";

var instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? "https://caihai123.com" : "/api",
  timeout: 5000,
});

// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    let token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    config.headers.appCode = "ggfwpt2.0"; // 统一授权平台
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    const data = response.data;
    var { code } = data;
    // 请求成功时进行响应处理
    switch (code) {
      case 200:
        return data;
      case 401: // 没有权限 包括未登录/登录超时
        message.error("未登录或token过期，请重新登录！");
        return Promise.reject(data);
      default:
        return Promise.reject(data);
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default instance;
