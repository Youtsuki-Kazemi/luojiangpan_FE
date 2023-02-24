<template>
  <div>
    <el-row :gutter="20" class="booklist">
      <template v-if="booklist.length === 0">
        <el-col :xs="24" class="bookitem">
          <el-card shadow="hover">
            <!-- <div class="newbtn" @click="openAddNewBookForm"> -->
            <!-- <i class="iconfont icon-add-circle icon"></i> -->
            暂无书籍
          </el-card>
        </el-col>
      </template>
      <template v-else>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" v-for="(o, index) in booklist" :key="index" class="bookitem"
          ><!-- :offset="index > 0 ? 1 : 0" :body-style="{ padding: '10px' }"-->
          <el-card shadow="hover">
            <div slot="header" class="clearfix">
              <span>no.{{ index + 1 }}</span>
              <el-popover v-if="ownid === userid" placement="right" title="操作" width="20" trigger="click" style="float: right">
                <el-button type="primary" size="mini">编辑</el-button>
                <el-button type="danger" size="mini" @click="deleteConfirm(o.bookid)">删除</el-button>
                <el-button slot="reference" type="text" style="padding: 3px 0"><i class="iconfont icon-ellipsis-vertical icon"></i></el-button>
              </el-popover>
            </div>
            <div class="item-content" @click="openItem(o.bookid, o.bookname)">
              <!-- <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image" /> -->
              <img :src="o.picture" />
              <div class="item-bottom">
                <span class="name">《{{ o.bookname }}》</span>
                <div class="text">
                  最近一次编辑时间:<br />
                  <time class="time">{{ getDateFormat(o.updated_time) }}</time>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col v-if="ownid === userid" :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="bookitem">
          <el-card shadow="hover">
            <div class="newbtn" @click="dialogFormVisible = true">
              <!-- <div class="newbtn" @click="openAddNewBookForm"> -->
              <i class="iconfont icon-add-circle icon"></i>
              新增书籍
            </div>
          </el-card>
        </el-col>
      </template>
    </el-row>
    <!-- 新增书籍模态框 -->
    <user-add-new-book v-if="ownid === userid" :ifopen="dialogFormVisible" :useruid="ownid" @toclose="iftoClose" @toupdate="iftoUpdate"></user-add-new-book>
  </div>
</template>

<script>
import { getUserBooksListAPI, postDeleteBookAPI } from "@/api/user.js";
import UserAddNewBook from "@/views/user/UserAddNewBook.vue";

export default {
  naem: "UserBooksList",
  components: { UserAddNewBook },
  props: {
    ownid: {
      //本地用户信息id
      type: String,
      default() {
        return 0;
      },
    },
    userid: {
      //当前查询用户id
      type: String,
      default() {
        return 0;
      },
    },
  },
  data() {
    return {
      booklist: [],
      // { bookid: 1, bookname: "No1 book", picture: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png", synopsis: "", updated_time: "" },
      currentDate: new Date(),
      dialogFormVisible: false, //判断是否打开
    };
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
  created() {
    this.getBookList();
    // console.log(this.booklist);
  },
  methods: {
    // 切换当前表单显示参数的值
    iftoClose(value) {
      this.dialogFormVisible = value;
    },
    // 新增数据提交成功后,更新数据
    iftoUpdate() {
      this.getBookList(); // 更新数据
    },
    // 打开单标签
    openItem(bookid, bookname) {
      console.log(bookid, bookname);
    },
    // 删除弹窗
    deleteConfirm(id) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.handleDelete(id); //调用删除方法
          // this.$message({
          //   type: "success",
          //   message: "删除成功!",
          // });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // ==接口操作==
    // 调用获取书籍列表接口
    getBookList() {
      getUserBooksListAPI(this.userid)
        .then((res) => {
          if (res.code !== 200) return this.$message({ type: "error", showClose: true, offset: 80, message: res.msg });
          // this.$message({ type: "success", showClose: true, offset: 80, message: res.msg });
          // console.log("res.data:", res.data);
          this.booklist = res.data;
        })
        .catch((err) => {
          // console.log(err);
          this.$message({ type: "error", showClose: true, offset: 80, message: "请求超时，请稍后重试" });
        });
    },
    // 调用删除接口
    handleDelete(id) {
      console.log("当前删除的id：", id);
      postDeleteBookAPI(id)
        .then((res) => {
          // console.log(res.msg);
          if (res.code !== 200) return this.$message({ type: "error", showClose: true, offset: 80, message: res.msg });
          this.$message({ type: "success", showClose: true, offset: 80, message: res.msg });
          this.getBookList(); // 更新数据
        })
        .catch((err) => {
          // console.log(err);
          this.$message({ type: "error", showClose: true, offset: 80, message: "请求超时，请稍后重试" });
        });
    },
  },
};
</script>

<style lang="less" scoped>
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
      .item-content {
        cursor: pointer;
      }
      .item-bottom {
        padding: 14px 0;
        line-height: 1.5rem;
        .name {
          color: var(--text-color);
          font-weight: 600;
        }
        .text {
          padding: 5px;
          font-size: smaller;
        }
      }
    }
    img {
      display: block;
      max-width: 300px;
      height: 250px;
      background-color: var(--primary-color);
    }
    .image {
      width: 100px;
      height: 100px;
      background-color: var(--body-color);
    }
    .newbtn {
      display: flex;
      flex-direction: column; //垂直排列
      justify-content: center;
      align-items: center;
      // max-width: 300px;
      height: 360px;
      cursor: pointer;
      i {
        font-size: 100px;
        font-weight: 500;
        margin: 10px;
      }
    }
  }
}
</style>
