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
