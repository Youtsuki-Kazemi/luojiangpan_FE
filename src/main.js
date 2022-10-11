import Vue from "vue";
import App from "./App.vue";
import router from "./router"; //引入router路由对象
import store from "./store";
import ElementUI from "element-ui"; //引入element-ui
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false; //是否显示产品构建信息
Vue.use(ElementUI); //引入element-ui

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app"); //相当于挂载el:'#app'
