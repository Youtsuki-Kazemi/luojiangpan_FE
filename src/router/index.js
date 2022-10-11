import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import IndexView from "../views/IndexView.vue";
import Index2View from "../views/Index2View.vue";
import { from } from "core-js/core/array";

// 懒加载方式2
const HelloWorld = () => import("../components/HelloWorld.vue");
const UserInfo = () => import("../components/UserInfo.vue");

// 通过Vue.use(插件)，来安装插件
Vue.use(VueRouter);

// 配置路由和组件映射关系
const routes = [
  {
    //设置默认跳转，当链接为空时默认跳转到重定向地址
    path: "",
    redirect: "/index", //重定向
  },
  {
    path: "/index",
    name: "home",
    component: HomeView,
    meta: {
      title: "首页",
    },
  },
  {
    path: "/about123",
    // name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // 路由懒加载方式1
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/hello",
    name: "hello",
    component: HelloWorld,
    meta: {
      title: "hello页",
    },
  },
  {
    path: "/uindex/:userid", //动态路由(params参数形式)
    component: IndexView,
    children: [
      //嵌套路由
      {
        path: "",
        redirect: "info",
      },
      {
        path: "info",
        component: UserInfo,
      },
    ],
  },
  {
    path: "/uindex2", //动态路由2(query查询形式)
    component: Index2View,
  },
];

const router = new VueRouter({
  routes,
  mode: "history", // 默认为hash哈希，链接存在#号。改为history可解决
  linkActiveClass: "active", // 设置默认链接激活时，赋予的class类
});

// 全局导航守卫
//前置守卫
router.beforeEach((to, from, next) => {
  // 从from跳转到to
  document.title = to.matched[0].meta.title; //位页面赋值title
  //必须要有next才会跳转
  // next();
  next("/login");
});
//后置钩子
router.afterEach((to, from) => {});

// 导出router对象
export default router;
