<template>
  <div class="header">
    <el-header>
      <div class="logo">后台管理</div>
      <div class="nav">
        <div>
          <el-popover placement="bottom" width="100" trigger="click">
            {{ name }}
            <el-button class="btn" slot="reference"><i class="iconfont icon-user icon"></i></el-button>
          </el-popover>
        </div>
        <el-button class="btn" @click="Logout"><i class="iconfont icon-sign-out icon"></i></el-button>
      </div>
    </el-header>
  </div>
</template>

<script>
export default {
  name: "AdminHeader",
  data() {
    return {
      name: "",
    };
  },
  created() {
    this.name = window.localStorage.getItem("admininfo");
  },
  methods: {
    Logout() {
      this.$confirm("确定要退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.localStorage.removeItem("utoken");
          window.localStorage.removeItem("admininfo");
          this.$router.push({
            path: "/index",
          });
          this.$message({
            type: "success",
            message: "退出成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  color: #fff;
  background-color: #648e93;
  box-shadow: 0 5px 12px 0 rgb(0 0 0 / 20%);
  line-height: 60px;
  .el-header {
    display: flex;
    justify-content: space-between;
    .logo {
      width: 200px;
      font-size: 24px;
    }
    .nav {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      align-items: center;
      div {
        margin: 0 20px;
      }
      .btn {
        width: 40px;
        height: 40px;
        padding: 0;
      }
    }
  }
}
</style>
