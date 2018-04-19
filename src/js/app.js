// 设置请求的基准路径
axios.defaults.baseURL = 'http://47.96.21.88:8888/api/public/v1';

// 定义右侧图片公共地址
const imgBaseUrl = {
    url: 'http://47.96.21.88:8888/' 
};

// 获取url地址参数
let getUrlParams = function (key) {
    // 获取url问好后的参数
    let params = location.search.substring(1);//截取字符串，从索引为1开始
    console.log(params);

    // 切割字符串，变为数组
    let arr = params.split('&');

    //声明对象，用来保存url参数
    let obj = {};

    // 遍历数组
    arr.forEach(function (item) {
        // 把数组的每个元素再次切割
        let val = item.split('=');
        // 存入对象--键值对方式
        obj[val[0]] = val[1];
    });

    // 根据参数获取对象中的值
    return obj[key];
}


// 响应拦截器
axios.interceptors.response.use(function (response) {
    // 在我们得到服务器返回的数据之前做一些处理
    return response.data;
}, function (error) {
    // Do something with response error      
    return Promise.reject(error);
});
