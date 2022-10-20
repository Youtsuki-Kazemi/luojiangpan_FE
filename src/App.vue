<template>
  <div id="app">
    <nav>
      <!-- <router-link to="/index" tag="button" replace active-class="active">Home</router-link> |
      <router-link to="/about123" tag="button" replace active-class="active">About</router-link> | -->

      <!-- <router-link to="/index" tag="button" replace>Home</router-link> |
      <router-link to="/about123" tag="button" replace>About</router-link> | -->

      <button @click="HomeClick">home</button>
      <button @click="AboutClick">about</button> |
      <!-- <button @click="IndexClick">index</button> -->

      <!-- 动态路由 -->
      <router-link :to="'/uindex/' + userid" replace>index</router-link>
      <router-link :to="{ path: '/uindex2', query: { userid: '123', username: 'abc' } }" replace>index2</router-link> |
      <!--  -->
      <button @click="IndexView">index</button>
      <button @click="Index2View">index2</button> |
      <router-link to="/hello" replace>hello</router-link>
      <h2>------Vuex状态管理------</h2>
      <div>{{ $store.state.count }}</div>
      <button @click="addition">+</button>
      <button @click="subtraction">-</button>
      <button @click="addNum(10)">+10</button>
      <div>{{ $store.getters.powerCounter }}</div>
      <!-- 将$store.getters.stdAgemore当成一个函数，加括号传值 -->
      <div>{{ $store.getters.stdAgemore(14) }}</div>
      <button @click="UploadInfo">异步修改state状态数据</button>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      userid: "1234567",
      username: "abc",
    };
  },
  methods: {
    HomeClick() {
      // this.$router.push('/index')
      this.$router.replace("/index").catch((err) => {
        err;
      });
    },
    AboutClick() {
      // this.$router.push('/about123')
      this.$router.replace("/about123");
    },
    // IndexClick(){
    //   this.$router.replace('/index')
    // }
    IndexView() {
      this.$router.push("/uindex/" + this.userid);
    },
    Index2View() {
      // this.$router.replace("/uindex2?userid=" + this.userid + "&username=" + this.username);
      this.$router.push({
        path: "/uindex2",
        query: {
          userid: this.userid,
          username: this.username,
        },
      });
    },
    //Vuex
    //需要修改时，调用mutations内的方法来修改
    addition() {
      this.$store.commit("increment");
    },
    subtraction() {
      this.$store.commit("decrement");
    },
    addNum(count) {
      //1.普通提交风格
      // this.$store.commit("addnum", count);
      //2.特殊提交封装
      this.$store.commit({
        type: "decrement",
        count,
      });
    },
    //payload（负载）
    addStd() {
      const std = { id: 4, name: "eee", age: 6 };
      this.$store.commit("addStdmore", std);
    },
    //异步修改数据
    UploadInfo() {
      // this.$store.dispatch("UploadInfo", '我是需要传入的payload');
      //当运行完成需要传过来信息时，action内使用了promise
      this.$store.dispatch("UploadInfo", '我是需要传入的payload').then(res=>{
        console.log(res);
      })
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.active {
  color: #f00;
}
</style>
