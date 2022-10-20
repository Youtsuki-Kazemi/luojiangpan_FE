import axios from "axios";

export function request(config) {
  //创建axios实例
  const instance = axios.create({
    baseURL: "http://192.168.0.106:8999",
    timeout: 5000,
  });

  //设置拦截器
  //1.请求时拦截
  instance.interceptors.request.use(
    (config) => {
      //   console.log(config);
      //1.当config中的一些信息，如header不符合服务器要去，可以在此修改
      //2.当每次发送网络请求时，希望在界面显示请求图标
      //3.当某些请求必须携带一些特殊的信息（如登录token等）
      //处理完放回config
      return config;
    },
    (err) => {
      //   console.log(err);
    }
  );
  //2.响应时拦截
  instance.interceptors.response.use(
    (res) => {
      //操作如上
      //   console.log(res);
      return res.data;
    },
    (err) => {
      //   console.log(err);
    }
  );

  //发送网络请求，并返回（返回的是promise）
  return instance(config);
}
