<template>
  <div>
    <nav class="sidebar" :class="{ close: ifClose }">
      <!--  close -->
      <header>
        <div class="image-text">
          <span class="image">
            <!-- 头图片 -->
            <slot name="sidebar-image"></slot>
          </span>
          <div class="text logo-text">
            <!-- 头文字 -->
            <slot name="sidebar-logotext"></slot>
          </div>
        </div>
        <i class="iconfont icon-arrow-right toggle" @click="toggleClick"></i>
      </header>
      <div class="menu-bar">
        <div class="menu">
          <!-- 搜索框插槽 -->
          <slot name="menu-search-box"></slot>
          <!-- 导航列表插槽 -->
          <slot name="menu-link"></slot>
        </div>
        <div class="bottom-content">
          <slot name="logoutbtn"></slot>
          <li class="mode">
            <div class="sun-moon">
              <i class="iconfont icon-sun icon moon"></i>
              <i class="iconfont icon-DND_mode icon sun"></i>
            </div>
            <span class="mode-text text">夜间模式</span>
            <div class="toggle-switch" @click="modeChange">
              <span class="switch"></span>
            </div>
          </li>
        </div>
      </div>
    </nav>
    <section class="home">
      <!-- 内容区域 -->
      <slot name="content"></slot>
    </section>
    <!-- 主题切换菜单 close -->
    <div class="changetheme close" title="主题切换">
      <div v-if="!isthememeneopen" class="theme-toggle" @click="themeMenu">
        <i class="iconfont icon-layout icon" slot="item-icon"></i>
      </div>
      <div v-else class="theme-toggle" @click="themeMenu">
        <i class="iconfont icon-close icon" slot="item-icon"></i>
      </div>
      <ul class="theme-menu">
        <li title="春" @click="changeSpring">
          <i class="iconfont icon-flower2e icon" slot="item-icon"></i>
        </li>
        <li title="夏" @click="changeSummer">
          <i class="iconfont icon-sun icon" slot="item-icon"></i>
        </li>
        <li title="秋" @click="changeFall">
          <i class="iconfont icon-Leaves icon" slot="item-icon"></i>
        </li>
        <li title="冬" @click="changeWinter">
          <i class="iconfont icon-snow icon" slot="item-icon"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      isthememeneopen: false,
      ifClose: true,
    };
  },
  mounted() {
    // 是否显示侧边栏
    const sidbar = window.sessionStorage.getItem("sidbar");
    if (sidbar === "open") {
      this.ifClose = false;
    }
    // 组件挂载时修改主题
    this.changeTheme();
    // const theme = window.localStorage.getItem("theme");
    // const body = document.querySelector("body");
    // body.className = theme;
  },
  methods: {
    // 主题菜单
    toggleClick() {
      const body = document.querySelector("body");
      const sidebar = body.querySelector("nav");
      const sidbaropen = sidebar.classList.toggle("close"); //在元素中移除的类名，如果该类名不存在, 则会在元素中添加类名
      // 保存侧边栏状态
      if (sidbaropen) {
        window.sessionStorage.setItem("sidbar", "close");
      } else {
        window.sessionStorage.setItem("sidbar", "open");
      }
    },
    // 夜间模式切换菜单
    modeChange() {
      const body = document.querySelector("body");
      const modeText = body.querySelector(".mode-text");
      if (body.classList.value == "" || body.classList.value != "dark") {
        body.className = "dark";
        // window.localStorage.setItem("theme", "dark");
      } else {
        this.changeTheme();
      }
      if (body.classList.contains("dark")) {
        //查看元素是否存在类
        modeText.innerText = "日间模式";
      } else {
        modeText.innerText = "夜间模式";
      }
    },
    // 主题切换
    themeMenu() {
      const body = document.querySelector("body");
      const sidebarbtn = body.querySelector(".changetheme");
      sidebarbtn.classList.toggle("close");
      this.isthememeneopen = !this.isthememeneopen;
    },
    changeTheme() {
      const theme = window.localStorage.getItem("theme");
      const body = document.querySelector("body");
      body.className = theme;
    },
    changeSpring() {
      const body = document.querySelector("body");
      body.className = "spring";
      window.localStorage.setItem("theme", "spring");
    },
    changeSummer() {
      const body = document.querySelector("body");
      body.className = "summer";
      window.localStorage.setItem("theme", "summer");
    },
    changeFall() {
      const body = document.querySelector("body");
      body.className = "fall";
      window.localStorage.setItem("theme", "fall");
    },
    changeWinter() {
      const body = document.querySelector("body");
      body.className = "winter";
      window.localStorage.setItem("theme", "winter");
    },
  },
};
</script>

<style lang="less" scoped>
@import "@/assets/css/sidebar.css";
</style>
