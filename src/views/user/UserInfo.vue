<template>
  <div>
    <main-sidebar>
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
        <el-row :gutter="20" class="booklist">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" v-for="(o, index) in books" :key="index" class="bookitem"
            ><!-- :offset="index > 0 ? 1 : 0" :body-style="{ padding: '10px' }"-->
            <el-card shadow="hover">
              <div slot="header" class="clearfix">
                <span>no.{{ index + 1 }}</span>
                <el-popover v-if="ownid === userid" placement="right" title="操作" width="20" trigger="click" style="float: right">
                  <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
                  <el-button slot="reference" type="text" style="padding: 3px 0"><i class="iconfont icon-ellipsis-vertical icon"></i></el-button>
                </el-popover>
              </div>
              <!-- <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image" /> -->
              <img :src="o.picture" class="image" />
              <div style="padding: 14px">
                <span>{{ o.bookname }}</span>
                <div class="bottom clearfix">
                  最近一次编辑时间:<time class="time">{{ getDateFormat(o.updated_time) }}</time>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </main-sidebar>
  </div>
</template>

<script>
import { getUserAPI } from "@/api/user.js";

import MainSidebar from "@/components/content/mainSidebar/MainSidebar.vue";
export default {
  name: "User",
  components: { MainSidebar },
  data() {
    return {
      ownid: "",
      username: "",
      userid: "",
      avatar: "",
      email: "",
      mobile: "",
      sex: 0,
      books: [
        { bookid: 1, bookname: "No1 book", picture: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png", synopsis: "", updated_time: "" },
        { bookid: 2, bookname: "No2 book", picture: "", synopsis: "", updated_time: "" },
        { bookid: 3, bookname: "No2 book", picture: "", synopsis: "", updated_time: "" },
        { bookid: 4, bookname: "No2 book", picture: "", synopsis: "", updated_time: "" },
        { bookid: 5, bookname: "No2 book", picture: "", synopsis: "", updated_time: "" },
        { bookid: 6, bookname: "No2 book", picture: "", synopsis: "", updated_time: "" },
      ],
      activeIndex: "1",
      currentDate: new Date(),
    };
  },
  created() {
    this.getOwnInfo();
    this.getUserInfo();
  },
  computed: {
    getbooksnum() {
      return this.books.length;
    },
    // 格式化时间
    getDateFormat() {
      return function (originVal) {
        if (originVal != "") {
          const dt = new Date(originVal);
          const y = dt.getFullYear();
          const m = (dt.getMonth() + 1 + "").padStart(2, "0");
          const d = (dt.getDate() + "").padStart(2, "0");
          const hh = (dt.getHours() + "").padStart(2, "0");
          const mm = (dt.getMinutes() + "").padStart(2, "0");
          const ss = (dt.getSeconds() + "").padStart(2, "0");
          return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
        } else {
          return "Unknown";
        }
      };
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    getOwnInfo() {
      const userinfo = window.localStorage.getItem("userInfo");
      this.ownid = userinfo.split("#")[0];
    },
    // 网络请求
    // 获取访问用户信息
    getUserInfo() {
      this.userid = this.$route.params.userid;
      getUserAPI(this.userid)
        .then((res) => {
          // console.log(res);
          if (res.code !== 200) return this.$message({ type: "error", showClose: true, offset: 80, message: res.msg });
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
    // 获取书籍
    //getBooks(){}
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

  // 书籍列表
  .booklist {
    margin: 15px 0;
    padding: 0 30px;
    // background-color: var(--sidebar-color);
    .bookitem {
      margin: 20px auto;
      .el-card {
        color: var(--text-color);
        background-color: var(--sidebar-color);
        .icon {
          color: var(--text-color);
        }
      }
      img {
        max-width: 300px;
        height: 250px;
        background-color: var(--primary-color);
      }
    }
  }
}
.time {
  font-size: 13px;
  color: #999;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.button {
  padding: 0;
  float: right;
}
.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
