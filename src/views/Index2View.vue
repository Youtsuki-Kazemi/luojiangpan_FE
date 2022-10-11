<template>
  <div>
    <h1 class="indexmessage">hello</h1>
    <h1>{{ message }}</h1>
    <h5>id:{{ $route.query.userid }}</h5>
    <h5>name:{{ $route.query.username }}</h5>
    <hr />
    <button @click="showmessage">显示</button>
  </div>
</template>

<script>
export default {
  name: "Index2View",
  data() {
    return {
      message: "this is index2view!",
    };
  },
  methods: {
    showmessage() {
      console.log(this.$route);
      console.log(this.$router);
    },
  },
};
</script>

<!-- <style lang="scss" scoped> -->
<style scoped>
.indexmessage {
  color: #0aa;
}
</style>
