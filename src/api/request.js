import axios from "axios";

// 封装axios
export function request(config) {
  //创建axios实例
  const instance = axios.create({
    baseURL: "/api", //baseURL 会自动加在请求地址上
    withCredentials: true, //设置携带cookie
    timeout: 5000,
  }); //发送网络请求，并返回（返回的是promise）

  //设置拦截器
  //1.请求时拦截
  instance.interceptors.request.use(
    (config) => {
      //1.当config中的一些信息，如header不符合服务器要去，可以在此修改
      //2.当每次发送网络请求时，希望在界面显示请求图标
      //3.当某些请求必须携带一些特殊的信息（如登录token等）
      //处理完放回config

      //让所有的请求都携带token
      let uToken = localStorage.getItem("token");
      if (uToken) {
        //在请求头里面添加一个头信息叫做 TOKEN ==》jsessionid(token)
        //后台通过token作为key值可以在redis中获得loginUser的信息
        // config.headers["TOKEN"] = uToken;
        // 方法2
        config.headers.Authorization = uToken;
      }
      return config;
    },
    (err) => {
      // 请求失败时，输出错误
      console.log("ERROR: TIMEOUT");
      return Promise.reject(err);
    }
  ); //2.响应时拦截
  instance.interceptors.response.use(
    (res) => {
      // 响应完成成功时，返回data
      return res.data;
    },
    (err) => {
      // 响应完成失败时，输出错误
      console.log("ERROR: TIMEOUT");
      return Promise.reject(err);
    }
  );
  //发送网络请求，并返回（返回的是promise）
  return instance(config);
}

// 封装序列化对象
// 类 qs.js，qs.stringify()
export function customqs(data) {
  let result = "";
  for (let key in data) {
    result += encodeURIComponent(key) + "=" + encodeURIComponent(data[key]) + "&";
  }
  return result.slice(0, result.length - 1);
}
