<template>
  <div class="dragmenu-bar-item" @click.self="itemClick">
    <slot name="item-icon"></slot>
    <slot name="item-tab"></slot>
  </div>
</template>

<script>
export default {
  name: "DragMenuItem",
  props: {
    itemid: {
      type: String,
      default: "0",
    },
  },
  computed: {
    // isActive() {
    // 获取当前活跃itemid
    //   const itemid = window.localStorage.getItem("itemid");
    //   console.log("itemid == this.itemid", itemid == this.itemid);
    //判断当前活跃路径
    //   return itemid == this.itemid;
    // },
  },
  methods: {
    itemClick() {
      //将点击的itemid发送给父级
      this.$emit("activeitem", this.itemid);
    },
  },
};
</script>

<style lang="less" scoped>
.dragmenu-bar-item {
  width: 50px;
  height: 50px;
  //   font-size: 1.5rem;
  //   color: var(--text-color);
  //   // transform: translate(10px, calc(-55px * var(--i) + 10px));
  //   transition: var(--tran-03);
}
</style>
