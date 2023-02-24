import { request, customqs } from "./request";
// baseURL: "http://192.168.0.106:8999",

// 获取用户信息
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

// 书籍相关接口
// 获取用户书籍列表
export function getUserBooksListAPI(userid) {
  const user_id = userid;
  return request({
    url: "/book/booklist",
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
// 提交新增书籍接口(修改接口未添加)
export function postAddNewBookAPI(args) {
  // console.log("这里是api，提交的数据是：", args);
  const { useruid, bookid, bookname, picture, synopsis } = args; // 解构
  return request({
    url: "/book/addbook",
    method: "POST",
    data: { useruid, bookid, bookname, picture, synopsis },
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
// user删除书籍
export function postDeleteBookAPI(id) {
  return request({
    url: "/book/delete",
    method: "POST",
    data: { bookid: id },
    headers: {
      //   "Content-Type": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
