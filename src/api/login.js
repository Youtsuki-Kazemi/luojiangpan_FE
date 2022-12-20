import { request, customqs } from "./request";
// baseURL: "http://192.168.0.106:8999",

// 用户登录接口
export function postLoginAPI(loginargs) {
  const { login_num, login_pwd } = loginargs; // 解构
  return request({
    url: "/login",
    method: "POST",
    data: { login_num, login_pwd },
    headers: {
      //   "Content-Type": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    // 序列化(按需)
    transformRequest: [
      (data) => {
        // 调用自定义序列化对象进行处理
        return customqs(data);
      },
    ],
  });
}
// 用户注册接口
export function postRegisterAPI(registerargs) {
  const { login_num, login_pwd, nickname, mobile, email } = registerargs;
  return request({
    url: "/login/register",
    method: "POST",
    data: { login_num, login_pwd, nickname, mobile, email },
    // 序列化
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    transformRequest: [
      (data) => {
        // 调用自定义序列化对象进行处理
        return customqs(data);
      },
    ],
  });
}
