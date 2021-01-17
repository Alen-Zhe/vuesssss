import axios from 'axios'

const server = axios.create({
  baseURL: "http://localhost:8080", //配置请求的url
  timeout: 6000, //配置超时时间
  //headers:{}//配置请求头
})

server.interceptors.request.use(function (config) {
  //非登录的请求都加上一个请求头
  console.log("请求拦截器已经执行");
  return config;
}, function (error) {
  return Promise.reject(error);
});

server.interceptors.response.use(function (response) {
  //后台会给一些特殊的编码或响应状态码
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default server