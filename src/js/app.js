// 设置请求的基准路径
axios.defaults.baseURL = 'http://47.96.21.88:8888/api/public/v1';

// 定义右侧图片公共地址
const imgBaseUrl = {
  url: 'http://47.96.21.88:8888/'
}

// 响应拦截器
axios.interceptors.response.use(function (response) {
    // 在我们得到服务器返回的数据之前做一些处理
    return response.data;
  }, function (error) {
    // Do something with response error      
    return Promise.reject(error);  
 });
