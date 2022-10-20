import Vue from "vue";
import App from "./App.vue";
import router from "./router"; //引入router路由对象
import store from "./store"; //引入vuex状态管理对象
import axios from "axios"; //映入axios网络请求框架
import ElementUI from "element-ui"; //引入element-ui框架
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false; //是否显示产品构建信息
Vue.use(ElementUI); //引入element-ui

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app"); //相当于挂载el:'#app'

// axios({
//   url: "http://192.168.0.106:8999/name/returnmanname",
//   // url: "http://123.207.32.32:8000/home/multidata",
//   //method: "get",
//   //专门针对get请求的参数拼接
//   params: {
//     last_name: "陈",
//     num: 1,
//     len: 3,
//   },
// }).then((res) => {
//   console.log(res);
// });

axios.defaults.baseURL = "http://192.168.0.106:8999";
axios.defaults.timeout = 5000;
axios({
  url: "/name/returnmanname",
  params: {
    last_name: "陈",
    num: 1,
    len: 3,
  },
}).then((res) => {
  console.log(res);
});

import { request } from "../network/request";
request({
  url: "/name/returnmanname",
  params: {
    last_name: "陈",
    num: 1,
    len: 3,
  },
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
