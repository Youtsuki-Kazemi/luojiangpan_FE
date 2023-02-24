<template>
  <div>
    <main-sidebar :ownid="ownid">
      <div slot="content">
        <!-- 顶部导航栏 -->
        <el-menu :default-active="activeIndex" class="el-navmenu" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-menu-item index="s">处理中心2</el-menu-item>
        </el-menu>
        <!-- 内容区域 -->
        <div class="content">
          <!-- 个人信息 -->
          <el-card class="infocard" :body-style="{ padding: '0px' }">
            <div slot="header" class="clearfix">
              <span>个人信息</span>
              <el-button v-if="ownid === userid" style="float: right; padding: 3px 0" type="text">修改</el-button>
            </div>
            <table class="infotable">
              <tbody>
                <tr>
                  <th class="tlabel">用户名</th>
                  <td>{{ username }}</td>
                  <th class="tlabel">性别</th>
                  <td v-if="this.sex == 0"><el-tag type="info">未知</el-tag></td>
                  <td v-else-if="this.sex == 1">
                    <el-tag><i class="iconfont icon-nan icon"></i></el-tag>
                  </td>
                  <td v-else>
                    <el-tag type="danger"><i class="iconfont icon-nv icon"></i></el-tag>
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <th class="tlabel">手机号</th>
                  <td>{{ mobile }}</td>
                  <th class="tlabel">邮箱</th>
                  <td>{{ email }}</td>
                </tr>
              </tbody>
            </table>
          </el-card>
          <h2>书籍列表</h2>
          <user-books-list :userid="userid" :ownid="ownid"></user-books-list>
        </div>
      </div>
    </main-sidebar>
  </div>
</template>

<script>
import { getUserAPI } from "@/api/user.js";
import MainSidebar from "@/components/content/mainSidebar/MainSidebar.vue";
import UserBooksList from "@/views/user/UserBooksList.vue";

export default {
  name: "User",
  components: { MainSidebar, UserBooksList },
  data() {
    return {
      ownid: "", //本地用户信息id
      username: "",
      userid: "",
      avatar: "",
      email: "",
      mobile: "",
      sex: 0,
      activeIndex: "1", //顶部导航栏
    };
  },
  created() {
    this.getOwnInfo();
    this.getUserInfo();
  },
  computed: {},
  methods: {
    // 顶部导航栏按钮
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // 获取本地用户信息
    getOwnInfo() {
      const userinfo = window.localStorage.getItem("userInfo");
      this.ownid = userinfo.split("#")[0];
    },
    // // 获取书籍
    // openAddNewBookForm() {
    //   this.$prompt("请输入邮箱", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    //     inputErrorMessage: "邮箱格式不正确",
    //   })
    //     .then(({ value }) => {
    //       this.$message({
    //         type: "success",
    //         message: "你的邮箱是: " + value,
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "取消输入",
    //       });
    //     });
    // },

    // --网络请求--
    // 获取访问用户信息

    // 获取当前用户数据
    getUserInfo() {
      // 获取当前查询用户的id
      this.userid = this.$route.params.userid ? this.$route.params.userid : window.localStorage.getItem("userInfo").split("#")[0];
      // console.log("当前userid", this.userid);
      getUserAPI(this.userid)
        .then((res) => {
          // console.log(res);
          // if (res.code !== 200) return this.$message({ type: "error", showClose: true, offset: 80, message: res.msg });
          this.username = res.userinfo.name;
          this.mobile = res.userinfo.mobile;
          this.email = res.userinfo.email;
          this.sex = res.userinfo.sex;
          this.avatar = res.userinfo.avatar;
        })
        .catch((err) => {
          // console.log(err);
          this.$message({ type: "error", showClose: true, offset: 80, message: "链接超时，请稍后重试" });
        });
    },
  },
};
</script>

<style lang="less" scoped>
// 顶部导航
.el-navmenu {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 100%;
  padding-right: 80px;
  background-color: var(--sidebar-color);
  color: var(--text-color);
  li {
    float: right;
  }
  // li:active {
  //   color: var(--text-color);
  // }
}
.el-menu--horizontal > .el-menu-item.is-active {
  color: var(--text-color);
  background-color: var(--primary-color-light);
  border-bottom: 2px solid var(--primary-color);
}
// .el-menu--horizontal > .el-menu-item.is-active:hover {

// }
.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  color: var(--text-color);
  background-color: var(--primary-color-light);
}

// 内容区域
.content {
  margin-top: 100px;
  padding: 0 60px;
  h2 {
    color: var(--text-color);
  }
  // 信息表单
  .infocard {
    // padding: 0;
    margin: 20px auto;
    color: var(--text-color);
    background-color: var(--sidebar-color);
    border: 1px solid var(--deep-color);
    border-radius: 8px;

    .infotable {
      width: 100%;
      // table-layout: auto;
      // border-collapse: separate;
      // border-spacing: 0;
      // border-radius: 8px;
      // overflow: hidden;
      th,
      td {
        height: 50px;
        line-height: 50px;
        // border: 1px solid #ebeef5;
        border: 1px solid var(--deep-color);
        padding: 0 10px;
      }
      .tlabel {
        // background: #fafafa;
        background: var(--label-color);
      }
    }
  }
  // .name-label {
  //   padding: 0 20px;
  //   background-color: var(--primary-color-light);
  // }
  // .name-content {
  //   padding: 0 20px;
  //   background-color: var(--primary-color-light);
  // }
}

// .time {
//   font-size: 13px;
//   color: #999;
// }
// .bottom {
//   margin-top: 13px;
//   line-height: 12px;
// }
// .button {
//   padding: 0;
//   float: right;
// }
// .image {
//   width: 100%;
//   display: block;
// }

// .clearfix:before,
// .clearfix:after {
//   display: table;
//   content: "";
// }
// .clearfix:after {
//   clear: both;
// }
</style>
