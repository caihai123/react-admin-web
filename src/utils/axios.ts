import axios from "axios";
import { message } from "@/App";
import router from "@/router";

export type AxiosResultPromise<Result extends any> = Promise<{
  result: Result;
  success: "success" | "failure";
  msg?: string;
}>;

declare module "axios" {
  interface AxiosResponse {
    result: any;
  }
}

/**
 * 添加了请求拦截和响应拦截的 `axios` 实例。
 */
const instance = axios.create({
  timeout: 5000,
  validateStatus(status) {
    // return status >= 200 && status < 300; // default
    return status === 200;
  },
});

// 请求拦截器
instance.interceptors.request.use(
  // 在发送请求之前做些什么
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  // 对请求错误做些什么
  function (error) {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  // 对响应数据做点什么
  function (response) {
    const { status, msg } = response.data;
    // 请求成功时进行响应处理
    switch (status) {
      case "success":
        return response.data;
      default:
        message.error(msg);
        return Promise.reject(response);
    }
  },
  // 对响应错误做点什么
  function (error) {
    switch (error.status) {
      case 401:
        router.navigate(`${router.basename}/login`);
        message.error("未登录或登录过期，请重新登录！");
        break;
      default:
        message.error(error.message);
        break;
    }
    return Promise.reject(error);
  }
);

export default instance;
