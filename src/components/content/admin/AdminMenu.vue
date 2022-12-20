<template>
  <div class="menu">
    <el-aside width="200px">
      <!--  -->
      <el-menu router default-active="2" class="el-menu-vertical-demo" background-color="#7cabb1" text-color="#fff" active-text-color="#2b312c">
        <div v-for="(item, index) in menus" :key="index">
          <el-menu-item v-if="item.path === '/admin/index'" :index="item.path">
            <i :class="item.iconClass"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
          <el-submenu v-else :index="index + ''">
            <template slot="title">
              <i :class="item.iconClass"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group v-for="(child, index) in item.children" :key="index">
              <el-menu-item :index="child.path">{{ child.name }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>

        <!-- <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航二</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu> -->
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  name: "AdminMenu",
  data() {
    return {
      menus: [],
    };
  },
  created() {
    this.$router.options.routes.forEach((x) => {
      if (x.path === "/admin") {
        this.menus = x.children;
      }
    });
  },
};
</script>

<style lang="less" scoped>
.menu {
  height: 100%;
  background-color: #cdd1d3;
  .el-aside {
    height: 100%;
    // .el-menu {
    //   background-color: #545c64;
    //   .el-submenu__title {
    //     color: #fff;
    //   }
    // }
    .el-menu-item i {
      padding: 0 10px;
      color: #fff;
    }
    .el-submenu__title i,
    .el-submenu__title i.el-icon-arrow-down {
      padding: 0 10px;
      color: #fff;
    }
  }
}
</style>
