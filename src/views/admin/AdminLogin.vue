<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>admin后台管理系统</span>
      </div>
      <el-form ref="form" :model="form" :rules="loginRules" label-width="80px">
        <el-form-item label="账号" prop="loginnum">
          <el-input v-model="form.loginnum"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-if="ifdisabled" class="submitbtn" @click="submit('form')">登录</el-button>
          <el-button v-else class="disabledbtn" disabled key="reg-disabled">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <router-view></router-view>
  </div>
</template>

<script>
import { postAdminLoginAPI } from "@/api/admin.js";

export default {
  name: "AdminLogin",
  data() {
    return {
      form: {
        loginnum: "",
        password: "",
      },
      loginRules: {
        loginnum: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      ifdisabled: true,
    };
  },
  methods: {
    submit(formname) {
      this.disabledBtn(); // 切换按钮
      this.$refs[formname].validate((valid) => {
        if (valid) {
          // alert("提交成功!");
          this.postAdminLogin(this.form.loginnum, this.form.password);
          this.disabledBtn(); // 切换按钮
        } else {
          // console.log("提交失败!!");
          this.$message({ type: "error", showClose: true, offset: 80, message: "请填写正确信息!" });
          this.disabledBtn(); // 切换按钮
          // return false;
        }
      });
    },
    disabledBtn() {
      this.ifdisabled = !this.ifdisabled;
    },
    // 登录请求
    postAdminLogin(login_num, login_pwd) {
      postAdminLoginAPI({ login_num, login_pwd })
        .then((res) => {
          // console.log(res);
          if (res.code !== 200) return this.$message({ type: "error", showClose: true, offset: 80, message: res.msg });
          window.localStorage.setItem("utoken", res.token);
          window.localStorage.setItem("admininfo", res.name);
          // window.sessionStorage.setItem("userInfo", res.id + "#" + res.name);
          // 跳转到个人中心
          // (需要修改为跳转到访问页)
          this.$router.push({
            path: "/admin/index",
          });
        })
        .catch((err) => {
          // console.log(err);
          this.$message({ type: "error", showClose: true, offset: 80, message: "登录超时，请稍后重试" });
          this.disabledBtn(); // 切换按钮
        });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  .box-card {
    width: 450px;
    margin: 100px auto;
    .el-card__header span {
      font-size: 20px;
    }
    .submitbtn {
      width: 100%;
      color: var(--sidebar-color);
      background-color: var(--primary-color);
      &:hover {
        color: var(--text-color);
        background-color: var(--primary-color-light);
      }
    }
    .disabledbtn {
      width: 100%;
      color: var(--sidebar-color);
      background-color: var(--primary-color-light);
    }
  }
}
</style>
