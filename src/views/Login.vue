<template>
  <div id="login">
    <header>
      <nav>
        <div class="logo" @click="gotoHome">骆江畔小栈</div>
      </nav>
    </header>
    <el-card class="login-card">
      <div slot="header" class="clearfix">
        <span>客官里边请~</span>
      </div>
      <div class="loginform" @keyup.enter="submitForm('loginRuleForm')">
        <!-- 登录 -->
        <div v-if="iflogin">
          <el-form :model="loginRuleForm" status-icon :rules="loginRules" ref="loginRuleForm" key="loginRuleForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="账号" prop="loginnum">
              <el-input v-model="loginRuleForm.loginnum"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="loginpwd">
              <el-input type="password" v-model="loginRuleForm.loginpwd"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button v-if="ifdisabled" class="submitbtn" @click="submitForm('loginRuleForm')" key="un-log-disabled">登录</el-button>
              <el-button v-else class="disabledbtn" disabled key="log-disabled">登录</el-button>
              <el-button @click="resetForm('loginRuleForm')">重置</el-button>
            </el-form-item>
            <span class="bottomspan" @click="showRegister">没有账号？点击注册</span>
          </el-form>
        </div>
        <!-- 注册 -->
        <div v-else>
          <el-form :model="registerRuleForm" status-icon :rules="registerRules" ref="registerRuleForm" key="registerRuleForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="登录账号" prop="registernum">
              <el-input v-model="registerRuleForm.registernum"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="registerpwd">
              <el-input type="password" v-model="registerRuleForm.registerpwd"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="registercheckpwd">
              <el-input type="password" v-model="registerRuleForm.registercheckpwd"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model.number="registerRuleForm.nickname"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button v-if="ifdisabled" class="submitbtn" @click="submitForm('registerRuleForm')" key="un-reg-disabled">注册</el-button>
              <el-button v-else class="disabledbtn" disabled key="reg-disabled">注册</el-button>
              <el-button @click="resetForm('registerRuleForm')">重置</el-button>
            </el-form-item>
            <span class="bottomspan" @click="showLogin">已有账号？点击登录</span>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { postLoginAPI, postRegisterAPI } from "@/api/login.js";

export default {
  name: "Login",
  data() {
    // 定义验证
    var validatePass = (rule, value, callback) => {
      if (this.registerRuleForm.registercheckpwd !== "") {
        this.$refs.registerRuleForm.validateField("registercheckpwd");
      }
      callback();
    };
    var validateCheckPass = (rule, value, callback) => {
      if (value === this.registerRuleForm.registerpwd) {
        callback();
      } else {
        callback(new Error("两次输入密码不一致!"));
      }
    };
    return {
      // 双向绑定数据
      loginRuleForm: {
        loginnum: "",
        loginpwd: "",
      },
      registerRuleForm: {
        registernum: "",
        registerpwd: "",
        registercheckpwd: "",
        nickname: "",
      },
      // 定义校验规则
      loginRules: {
        loginnum: [{ required: true, message: "请输入账号", trigger: "blur" }],
        loginpwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      registerRules: {
        registernum: [{ required: true, message: "请输入账号", trigger: "blur" }],
        registerpwd: [{ required: true, message: "请输入密码", trigger: "blur" }, { validator: validatePass }],
        registercheckpwd: [{ required: true, message: "请再次输入密码", trigger: "blur" }, { validator: validateCheckPass }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
      },
      iflogin: true,
      ifdisabled: true,
    };
  },
  methods: {
    //表单操作
    submitForm(formName) {
      this.disabledBtn(); // 切换按钮
      if (this.iflogin) {
        //点击登录
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert("提交成功!");
            // 调用登录接口
            this.postLogin(this.loginRuleForm.loginnum, this.loginRuleForm.loginpwd);
          } else {
            // console.log("提交失败!!");
            this.$message({ type: "error", showClose: true, offset: 80, message: "请填写正确信息!" });
            this.disabledBtn(); // 切换按钮
            return false;
          }
        });
      } else {
        //点击注册
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert("提交成功!");
            // 调用注册接口
            this.postRegister(this.registerRuleForm.registernum, this.registerRuleForm.registerpwd, this.registerRuleForm.nickname);
          } else {
            // console.log("提交失败!!");
            this.$message({ type: "error", showClose: true, offset: 80, message: "请填写正确信息!" });
            this.disabledBtn(); // 切换按钮
            return false;
          }
        });
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 表单切换
    showRegister() {
      this.iflogin = false;
    },
    showLogin() {
      this.iflogin = true;
    },
    disabledBtn() {
      this.ifdisabled = !this.ifdisabled;
    },
    // 网络请求
    // 登录请求
    postLogin(login_num, login_pwd) {
      postLoginAPI({ login_num, login_pwd })
        .then((res) => {
          // console.log(res);
          if (res.code !== 200) return this.$message({ type: "error", showClose: true, offset: 80, message: res.msg });
          window.localStorage.setItem("token", res.token);
          window.localStorage.setItem("userInfo", res.id + "#" + res.name);
          // 跳转到个人中心
          // (需要修改为跳转到访问页)
          this.$router.push({
            path: "/user/" + res.id,
          });
        })
        .catch((err) => {
          // console.log(err);
          this.$message({ type: "error", showClose: true, offset: 80, message: "登录超时，请稍后重试" });
          this.disabledBtn(); // 切换按钮
        });
    },
    // 注册请求
    postRegister(login_num, login_pwd, nickname) {
      const mobile = login_num;
      const email = login_num;
      postRegisterAPI({ login_num, login_pwd, nickname, mobile, email })
        .then((res) => {
          // console.log(res);
          if (res.code !== 200) return this.$message({ type: "error", showClose: true, offset: 80, message: res.msg });
          this.$message({ type: "success", offset: 80, message: res.msg });
          this.$refs.registerRuleForm.resetFields();
          // 跳转到登录页
          this.iflogin = true;
        })
        .catch((err) => {
          // console.log(err);
          this.$message({ type: "error", showClose: true, offset: 80, message: "链接超时，请稍后重试" });
          this.disabledBtn(); // 切换按钮
        });
    },
    // 事件监听
    gotoHome() {
      // 跳转到s首页
      this.$router.push({
        path: "/",
      });
    },
  },
  mounted() {
    // 修改主题
    const theme = window.localStorage.getItem("theme");
    const body = document.querySelector("body");
    body.className = theme;
  },
};
</script>

<style lang="less" scoped>
#login {
  width: 100%;
  height: 100%;
  position: absolute;
  header {
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    color: var(--sidebar-color);
    background-color: var(--primary-color);
    .logo {
      position: absolute;
      font-size: 20px;
      font-weight: 600;
      transition: var(--tran-03);
      cursor: pointer;
      &:hover {
        font-size: 22px;
      }
    }
  }
  .login-card {
    width: 500px;
    margin: 120px auto;
    .el-card__header span {
      font-size: 20px;
    }
    .demo-ruleForm {
      overflow: hidden;
      .submitbtn {
        color: var(--sidebar-color);
        background-color: var(--primary-color);
        &:hover {
          color: var(--text-color);
          background-color: var(--primary-color-light);
        }
      }
      .disabledbtn {
        color: var(--sidebar-color);
        background-color: var(--primary-color-light);
      }
      .bottomspan {
        float: right;
        cursor: pointer;
        &:hover {
          color: var(--primary-color);
        }
      }
    }
  }
}
</style>
