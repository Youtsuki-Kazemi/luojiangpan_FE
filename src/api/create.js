import { request, customqs } from "./request";

// 获取随机男性名称
export function getManNameAPI(args) {
  return request({
    url: "/name/returnmanname",
    method: "GET",
    params: args,
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
// 获取随机女性名称
export function getWomenNameAPI(args) {
  return request({
    url: "/name/returnwomenname",
    method: "GET",
    params: args,
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
