import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //定义状态变量
    count: 0,
    students: [
      { id: 1, name: "aaa", age: 10 },
      { id: 2, name: "bbb", age: 15 },
      { id: 3, name: "ccc", age: 20 },
      { id: 4, name: "ddd", age: 30 },
    ],
    info: { name: "aaa", age: 17 },
  },
  getters: {
    //类计算属性
    powerCounter(state) {
      return state.count * 10;
    },
    stdAgemore(state) {
      // 返回函数，使用时当函数可直接传值进来
      return (age) => {
        return state.students.filter((s) => s.age > age);
      };
    },
  },
  mutations: {
    //定义方法
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
    //
    addnum(state, payload) {
      //1.普通提交风格，直接传入值
      // state.count += payload;
      //2.特殊提交封装，传回的对象
      state.count += payload.count;
    },
    //额外的参数为载荷payload
    addStdmore(state, std) {
      state.students.push(std);
    },
    //
    //当需要异步修改操作时，需要在action中调用事件
    UploadInfo(state) {
      state.info.name = "bbb";
    },
  },
  actions: {
    aUploadInfo(context, payload) {
      //context可以理解为store对象
      //异步调用mutations中需要异步操作的方法
      // setTimeout(() => {
      //   context.commit("UploadInfo");
      //   console.log(payload);
      // }, 1000);
      //当运行完成需要传出信息时，使用promise
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          context.commit("UploadInfo");
          console.log(payload);
          resolve("运行完成");
        }, 1000);
      });
    },
  },
  modules: {},
});
