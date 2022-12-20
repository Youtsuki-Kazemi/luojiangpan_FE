<template>
  <div @click="itemClick">
    <li class="nav-link" :class="{ active: isActive }" :title="title">
      <div v-if="!isActive" :class="{ active: isActive }">
        <slot name="item-icon"></slot>
      </div>
      <div v-else :class="{ active: isActive }">
        <slot name="item-icon-active"></slot>
      </div>
      <div :class="{ active: isActive }">
        <!-- :style="activeStyle"-->
        <slot name="item-text"></slot>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  name: "SideBarItem",
  props: {
    //定义props对象获取父级传进来的值
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
    title: String,
  },
  computed: {
    isActive() {
      //判断当前活跃路径
      return this.$route.path.indexOf(this.path) !== -1;
      //   return this.$route.path === this.path;
    },
    activeStyle() {
      //根据当前活跃路径，赋予样式
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    // 链接跳转
    itemClick() {
      this.$router.replace(this.path);
    },
  },
};
</script>

<style lang="less" scoped>
@import "@/assets/css/sidebar.css";
</style>
