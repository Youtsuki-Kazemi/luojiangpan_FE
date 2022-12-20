<template>
  <side-bar>
    <!-- 头图片 -->
    <div slot="sidebar-image">
      <div v-if="!hasUser">
        <img src="~@/assets/logo.png" alt="" />
      </div>
      <div v-else>
        <img src="~@/assets/image/133URMT4AhS.png" alt="" />
      </div>
    </div>
    <!-- 头文字 -->
    <div slot="sidebar-logotext">
      <span class="lgtext">骆江畔小栈</span>
      <div v-if="!hasUser">
        <span class="name">{{ dateState }}</span>
      </div>
      <div v-else>
        <span class="name">{{ dateState }},{{ this.userinfo.name }}</span>
      </div>
    </div>
    <!-- 导航搜索框 -->
    <div slot="menu-search-box">
      <li class="search-box" @click="searchboxClick">
        <i class="iconfont icon-search icon"></i>
        <input type="text" placeholder="搜索" />
      </li>
    </div>
    <!-- 导航列表 -->
    <div slot="menu-link" class="menu-link">
      <ul>
        <side-bar-item path="/index" title="首页">
          <i class="iconfont icon-home icon" slot="item-icon"></i>
          <i class="iconfont icon-home-filling icon" slot="item-icon-active"></i>
          <span class="text nav-text" slot="item-text">首页</span>
        </side-bar-item>
        <side-bar-item path="/writing" title="创作">
          <i class="iconfont icon-bianji icon" slot="item-icon"></i>
          <i class="iconfont icon-edit-filling icon" slot="item-icon-active"></i>
          <span class="text nav-text" slot="item-text">创作</span>
        </side-bar-item>
        <side-bar-item :path="'/user/' + this.userinfo.id" title="个人中心">
          <i class="iconfont icon-user icon" slot="item-icon"></i>
          <i class="iconfont icon-user-filling icon" slot="item-icon-active"></i>
          <span class="text nav-text" slot="item-text">个人中心</span>
        </side-bar-item>
        <side-bar-item path="/about" title="关于">
          <i class="iconfont icon-fabulous icon" slot="item-icon"></i>
          <i class="iconfont icon-love icon" slot="item-icon-active"></i>
          <span class="text nav-text" slot="item-text">关于</span>
        </side-bar-item>
      </ul>
    </div>
    <!-- 退出登录按钮 -->
    <div slot="logoutbtn">
      <div v-if="hasUser">
        <li class="nav-link" @click="LogoutClick" title="退出登录">
          <i class="iconfont icon-sign-out icon"></i>
          <span class="text nav-text">退出登录</span>
        </li>
      </div>
    </div>
    <div slot="content">
      <slot></slot>
    </div>
  </side-bar>
</template>

<script>
import SideBar from "@/components/common/sidebar/SideBar";
import SideBarItem from "@/components/common/sidebar/SideBarItem";
export default {
  name: "MainSidebar",
  data() {
    return {
      userinfo: {},
    };
  },
  components: {
    SideBar,
    SideBarItem,
  },
  computed: {
    // 判断用户是否登录
    hasUser() {
      const token = window.localStorage.getItem("token");
      if (!token) {
        return false;
      } else {
        const user = window.localStorage.getItem("userInfo");
        this.userinfo.id = user.split("#")[0];
        this.userinfo.name = user.split("#")[1];
        return true;
      }
    },
    // 获取用户信息
    // getUserId() {
    //   const token = window.localStorage.getItem("token");
    //   if (!token) return next("/login");
    // },
    // 获取当前时间段
    dateState() {
      let date = new Date();
      if (date.getHours() >= 6 && date.getHours() < 12) {
        return "上午好";
      } else if (date.getHours() >= 12 && date.getHours() < 18) {
        return "下午好";
      } else {
        return "晚上好";
      }
    },
  },
  methods: {
    // 搜索框激活侧边栏
    searchboxClick() {
      const body = document.querySelector("body");
      const sidebar = body.querySelector("nav");
      sidebar.classList.remove("close");
    },
    // 退出登录
    LogoutClick() {
      window.localStorage.clear();
      this.$router.push({
        path: "/index",
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "@/assets/css/sidebar.css";
</style>
