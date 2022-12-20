import { request, customqs } from "./request";
// baseURL: "http://192.168.0.106:8999",

export function getUserAPI(userid) {
  const user_id = userid;
  return request({
    url: "/user",
    method: "GET",
    params: { user_id },
    // 序列化
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    //   transformRequest: [
    //     (data) => {
    //       // 调用自定义序列化对象进行处理
    //       return customqs(params);
    //     },
    //   ],
  });
}
