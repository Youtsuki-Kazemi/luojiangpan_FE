<template>
  <div id="app">
    <keep-alive include="UserWriting">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  // Index2View() {
  //   // this.$router.replace("/uindex2?userid=" + this.userid + "&username=" + this.username);
  //   this.$router.push({
  //     path: "/uindex2",
  //     query: {
  //       userid: this.userid,
  //       username: this.username,
  //     },
  //   });
  // }
};
</script>

<style lang="less">
@import "@/assets/css/base.css";
@import "@/assets/iconfont/iconfont.css";
// html,
// body {
//   width: 100%;
//   height: 100%;
// }
</style>
