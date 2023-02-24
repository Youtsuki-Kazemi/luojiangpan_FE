import { request, customqs } from "./request";
// baseURL: "http://192.168.0.106:8999",

// admin登录接口
export function postAdminLoginAPI(loginargs) {
  const { login_num, login_pwd } = loginargs; // 解构
  return request({
    url: "/admin/login",
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

/**
const morkdata = [
  {
    uid: 1,
    nickname: "骆江畔",
    mobile: "15802093123",
    email: "15802093123@163.com",
    sex: 2,
  },
  {
    uid: 2,
    nickname: "圣埃蒂安",
    mobile: "15802093123",
    email: "15802093123@163.com",
    sex: 2,
  },
  {
    uid: 3,
    nickname: "创世神",
    mobile: "15802093123",
    email: "15802093123@163.com",
    sex: 0,
  },
  {
    uid: 4,
    nickname: "兰蒂斯",
    mobile: "15802093123",
    email: "15802093123@163.com",
    sex: 1,
  },
  {
    uid: 5,
    nickname: "妮萨",
    mobile: "15802093123",
    email: "15802093123@163.com",
    sex: 2,
  },
  {
    uid: 6,
    nickname: "圣埃蒂安",
    mobile: "15802093123",
    email: "15802093123@163.com",
    sex: 2,
  },
  {
    uid: 7,
    nickname: "创世神",
    mobile: "15802093123",
    email: "15802093123@163.com",
    sex: 0,
  },
  {
    uid: 8,
    nickname: "兰蒂斯",
    mobile: "15802093123",
    email: "15802093123@163.com",
    sex: 1,
  },
  {
    uid: 9,
    nickname: "妮萨",
    mobile: "15802093123",
    email: "15802093123@163.com",
    sex: 2,
  },
];
 */

// admin获取用户列表(包括查询)
export function getAdminUserListAPI(params) {
  const { nickname } = params;
  //   mock假数据
  // const data = {
  //   msg: "数据更新成功",
  //   code: 200,
  //   total: 9,
  //   data: morkdata,
  // };
  // return new Promise((resolve, reject) => {
  //   resolve(data);
  // });
  return request({
    url: "/admin/userlist",
    method: "get",
    params: { nickname },
    headers: {
      //   "Content-Type": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

// admin新增/编辑用户信息
export function postAdminUserSetAPI(args) {
  const { uid, nickname, sex, mobile, email } = args; // 解构数据
  // console.log("当前提交到接口的数据:", args);
  // mock假数据
  // let msg = uid === "-1" ? "新增成功" : "修改成功";
  // const data = { msg: msg, code: 200, total: 10, data: morkdata };
  // return new Promise((resolve, reject) => {
  //   resolve(data);
  // });
  return request({
    url: "/admin/userlist/set",
    method: "POST",
    data: { uid, nickname, sex, mobile, email },
    headers: {
      //   "Content-Type": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

// admin删除用户
export function postAdminUserDeleteAPI(id) {
  //   mock假数据
  // const data = { msg: `删除id=${id}成功`, code: 200 };
  // return new Promise((resolve, reject) => {
  //   resolve(data);
  // });
  return request({
    url: "/admin/userlist/delete",
    method: "POST",
    data: { uid: id },
    headers: {
      //   "Content-Type": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
