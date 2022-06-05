import axios from "axios";
// import { AxiosRequestConfig } from "axios";
// 实例化axios
const http = axios.create({
    baseURL: "http://localhost:3000/api/",
    timeout: 5000,
})
// 添加请求拦截器
http.interceptors.request.use(config => {
    // config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
}, error => {
    return Promise.reject(error);
})
// 添加响应拦截器
http.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
})  
export default http;