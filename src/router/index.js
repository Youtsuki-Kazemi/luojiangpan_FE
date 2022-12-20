import Vue from "vue";
import VueRouter from "vue-router";

// 懒加载
const Login = () => import("../views/Login.vue");
const Index = () => import("../views/Index.vue");
const UserIndex = () => import("../views/user/UserInfo.vue");
const UserInfo = () => import("../components/UserInfo.vue");
const UserWriting = () => import("../views/user/UserWriting.vue");
// const AdminLogin = () => import("../views/admin/AdminLogin.vue");

// 异步请求（会分离出独立组件js）
// const Login = resolve => require(['../views/Login.vue'], resolve);

// 通过Vue.use(插件)，来安装插件
Vue.use(VueRouter);

// 解决导航栏中的vue-router在3.0版本以上重复点菜单报错问题
// 解决：Uncaught (in promise) NavigationDuplicated;
let originalPush = VueRouter.prototype.push; // 先保存一份 VueRouter.prototype.push方法
let originalRepace = VueRouter.prototype.replace;
// call(); 篡改上下文    catch(); 捕获异常 ****
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((e) => e);
};
VueRouter.prototype.replace = function replace(location) {
  return originalRepace.call(this, location).catch((e) => e);
};

// 配置路由和组件映射关系
const routes = [
  {
    //设置默认跳转，当链接为空时默认跳转到重定向地址
    path: "",
    redirect: "/index", //重定向
  },
  {
    path: "/index",
    name: "index",
    component: Index,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/user/:userid",
    name: "user",
    component: UserIndex,
    children: [],
  },
  {
    path: "/writing",
    name: "writing",
    component: UserWriting,
  },
  {
    path: "/admin/login",
    name: "adminlogin",
    component: () => import("../views/admin/AdminLogin.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    redirect: "/admin/index",
    iconClass: "iconfont icon-home",
    component: () => import("../views/admin/Admin.vue"),
    children: [
      {
        path: "/admin/index",
        name: "首页",
        iconClass: "iconfont icon-home",
        component: () => import("../views/admin/AdminIndex.vue"),
      },
      {
        path: "/admin/user",
        name: "用户管理",
        iconClass: "iconfont icon-modular",
        component: () => import("../views/admin/AdminUser.vue"),
        children: [
          {
            path: "/admin/userlist",
            name: "用户列表",
            iconClass: "iconfont icon-modular",
            component: () => import("../views/admin/AdminUserList.vue"),
          },
          {
            path: "/admin/userset",
            name: "用户信息管理",
            iconClass: "iconfont icon-modular",
            component: () => import("../views/admin/AdminUserSet.vue"),
          },
        ],
      },
      {
        path: "/admin/books",
        name: "书籍管理",
        iconClass: "iconfont icon-layout",
        component: () => import("../views/admin/AdminBooks.vue"),
        children: [
          {
            path: "/admin/bookslist",
            name: "书籍列表",
            iconClass: "iconfont icon-layout",
            component: () => import("../views/admin/AdminBooksList.vue"),
          },
          {
            path: "/admin/booksset",
            name: "书籍信息管理",
            iconClass: "iconfont icon-layout",
            component: () => import("../views/admin/AdminBooks.vue"),
          },
        ],
      },
    ],
  },

  // {
  //   path: "/hello",
  //   name: "hello",
  //   component: HelloWorld,
  //   meta: {
  //     title: "hello页",
  //   },
  // },
  // {
  //   path: "/uindex2", //动态路由2(query查询形式)
  //   component: Index2View,
  // },
];

// 创建路由对象
const router = new VueRouter({
  routes,
  mode: "history", // 默认为hash哈希，链接存在#号。改为history可解决
  // linkActiveClass: "active", // 设置默认链接激活时，赋予的class类
  base: process.env.BASE_URL,
});

// 全局导航守卫
//前置守卫
// router.beforeEach((to, from, next) => {
//   // 从from跳转到to
//   document.title = to.matched[0].meta.title; //位页面赋值title
//   //必须要有next才会跳转
//   // next();
//   next("/login");
// });
//后置钩子
// router.afterEach((to, from) => {});

// 配置路由拦截
router.beforeEach((to, from, next) => {
  if (to.path.split("/")[1] === "admin") {
    // admin
    if (to.path === "/admin/login") return next();
    const utoken = window.localStorage.getItem("utoken");
    if (!utoken) return next("/admin/login");
    else next();
  } else {
    // user
    if (to.path === "/login") return next();
    const token = window.localStorage.getItem("token");
    const passpath = ["", "index", "about"]; //无需token的url
    if (passpath.indexOf(to.path.split("/")[1]) === -1 && !token) return next("/login");
    else next();
  }
});

// 导出router对象
export default router;
