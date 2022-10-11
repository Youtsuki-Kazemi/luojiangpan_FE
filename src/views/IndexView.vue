<template>
  <div>
    <h1 class="indexmessage">hello,{{ getid }}</h1>
    <h1>{{ message }}</h1>
    <h5>{{ $route.params.userid }}</h5>
    <hr />
    <div class="ubox">
      <router-link :to="'/uindex/' + getid + '/info'" replace>个人信息</router-link>
      <!-- <router-link :to="'/uindex/info'" replace>个人信息</router-link> -->
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexView",
  data() {
    return {
      message: "this is indexview!",
    };
  },
  computed: {
    getid() {
      // 获取链接部分
      return this.$route.params.userid; //要与index.js里定义的动态路由名字对应
    },
  },
};
</script>

<!-- <style lang="scss" scoped> -->
<style scoped>
.indexmessage {
  color: #0aa;
}
.ubox {
  border: 1px solid #000;
}
</style>
