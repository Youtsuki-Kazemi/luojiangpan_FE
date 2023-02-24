<template>
  <div class="listtable">
    <!-- <el-card> -->
    <!-- 查询表单 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
      <el-form-item label="用户名">
        <el-input v-model="formInline.nickname" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="onFind">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
      <el-form-item class="adduser">
        <el-button type="danger" plain @click="openAddUser"><i class="iconfont icon-add"></i>新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 新增/修改模态表单 -->
    <el-dialog :title="ifadduser ? '新增用户' : '修改用户信息'" :visible.sync="dialogFormVisible">
      <el-form :model="addUserform" :rules="addUserRules" ref="addUserform">
        <el-form-item label="用户名称" :label-width="formLabelWidth" prop="nickname">
          <el-input v-model="addUserform.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-radio v-model="addUserform.sex" :label="0">未知</el-radio>
          <el-radio v-model="addUserform.sex" :label="1">男</el-radio>
          <el-radio v-model="addUserform.sex" :label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="addUserform.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="addUserform.email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddUser">取 消</el-button>
        <el-button type="primary" @click="sumbitAddUser('addUserform')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 列表 -->
    <el-table :data="compData" border style="width: 100%">
      <el-table-column prop="uid" label="uid" align="center" sortable> </el-table-column>
      <el-table-column prop="nickname" label="用户名" align="center" sortable> </el-table-column>
      <el-table-column prop="sex_text" label="性别" align="center" sortable> </el-table-column>
      <el-table-column prop="mobile" label="手机" align="center" sortable> </el-table-column>
      <el-table-column prop="email" label="邮箱" align="center" sortable> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"><i class="iconfont icon-bianji icon"></i></el-button>
          <el-button size="mini" type="danger" @click="deleteConfirm(scope.$index, scope.row)"><i class="iconfont icon-ashbin icon"></i></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页（前端分页） -->
    <!-- 分页操作：slice((当前页数-1)*每页条数, 当前页数*每页条数) -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 30, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- </el-card> -->
  </div>
</template>

<script>
import { getAdminUserListAPI, postAdminUserSetAPI, postAdminUserDeleteAPI } from "@/api/admin.js";

export default {
  name: "AdminUserList",
  data() {
    return {
      tableData: [],
      currentPage: 1, // 当前页数
      pageSize: 5, //每页显示条数
      total: 0, //总数
      formInline: {
        nickname: "",
      },
      dialogFormVisible: false, //模态表单显示
      formLabelWidth: "80px",
      addUserform: {
        uid: -1,
        nickname: "",
        sex: 0,
        mobile: "",
        email: "",
      },
      addUserRules: {
        //校验规则
        nickname: [{ required: true, message: "请输入用户名" }],
        sex: [{ required: true }],
        mobile: [{ required: true, message: "请输入手机号" }],
        email: [{ required: true, message: "请输入电子邮箱" }],
      },
      ifadduser: true, //判断当前表单状态
      ifaddinfo: false, //判断是否为刚进页面未生成校验
    };
  },
  created() {
    this.getuserlist(this.formInline); //更新数据
  },
  computed: {
    // 数据显示计算
    compData() {
      return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    },
  },
  methods: {
    // ==数据列表操作==
    // 获取选择每页几条
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    // 获取当前页数
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 数据查询
    onFind() {
      this.getuserlist(this.formInline);
    },
    // 重置查询
    onReset() {
      this.formInline = { nickname: "" }; //重置formInline对象
      this.getuserlist(this.formInline);
    },
    // ==新增/编辑表单操作==
    // 打开表单
    openAddUser() {
      this.ifadduser = true;
      // 清空默认值
      this.addUserform = { uid: -1, nickname: "", sex: 0, mobile: "", email: "" };
      if (this.ifaddinfo) {
        // 根据是否生成校验，是：重置表单验证
        this.$refs["addUserform"].resetFields();
      }
      this.dialogFormVisible = true;
    },
    // 关闭表单
    closeAddUser() {
      this.dialogFormVisible = false;
    },
    // 提交新增/编辑
    sumbitAddUser(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          // console.log("提交成功!!");
          // 调用新增/编辑接口
          this.postuserEdit(this.addUserform);
          this.dialogFormVisible = false;
        } else {
          // console.log("提交失败!!");
          this.$message({ type: "error", showClose: true, offset: 80, message: "请填写正确信息!" });
        }
      });
    },
    // ==单行数据操作==
    // 编辑（打开表单）
    handleEdit(index, row) {
      this.ifadduser = false;
      this.ifaddinfo = true;
      this.dialogFormVisible = true;
      // ！！不要直接赋值，做一步扩展！！
      this.addUserform = { ...row };
    },
    // 删除弹窗
    deleteConfirm(index, row) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.handleDelete(index, row); //调用删除方法
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
    // 调用请求数据接口
    getuserlist(params) {
      // console.log("调用更新数据接口,", params);
      getAdminUserListAPI(params)
        .then((res) => {
          // console.log(res);
          if (res.code !== 200) return this.$message({ type: "error", showClose: true, offset: 80, message: res.msg });
          // this.$message({ type: "success", showClose: true, offset: 80, message: res.msg });
          this.tableData = res.data; //获取数据
          // 部分数据格式化处理(不要修改原数据)
          this.tableData.forEach((item) => {
            item.sex === 1 ? (item.sex_text = "男") : item.sex === 2 ? (item.sex_text = "女") : (item.sex_text = "未知");
          });
          this.total = res.total; //获取数据总数
          if (this.total / this.pageSize < this.currentPage && this.currentPage > 1) return (this.currentPage -= 1); // 当前总数除以每页数的结果小于当前页数，把页数减一
        })
        .catch((err) => {
          // console.log(err);
          this.$message({ type: "error", showClose: true, offset: 80, message: "登录超时，请稍后重试" });
        });
    },
    // 调用新增/编辑接口
    postuserEdit(row) {
      // console.log(row);
      postAdminUserSetAPI(row)
        .then((res) => {
          // console.log(res.msg);
          if (res.code !== 200) return this.$message({ type: "error", showClose: true, offset: 80, message: res.msg });
          this.$message({ type: "success", showClose: true, offset: 80, message: res.msg });
          this.getuserlist(this.formInline); // 更新数据
        })
        .catch((err) => {
          // console.log(err);
          this.$message({ type: "error", showClose: true, offset: 80, message: "请求超时，请稍后重试" });
        });
    },
    // 调用删除接口
    handleDelete(index, row) {
      // console.log(index, row);
      postAdminUserDeleteAPI(row.uid)
        .then((res) => {
          // console.log(res.msg);
          if (res.code !== 200) return this.$message({ type: "error", showClose: true, offset: 80, message: res.msg });
          this.$message({ type: "success", showClose: true, offset: 80, message: res.msg });
          this.getuserlist(this.formInline); // 更新数据
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
.listtable {
  .el-pagination {
    margin: 20px 0;
  }
}
.el-form {
  padding: 0 20px;
  .adduser {
    float: right;
  }
}
</style>
