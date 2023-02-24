<template>
  <div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :model="addBookform" :rules="addBookRules" ref="addBookform">
        <el-form-item label="书籍名称" :label-width="formLabelWidth" prop="bookname">
          <el-input v-model="addBookform.bookname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="书籍简介" :label-width="formLabelWidth" prop="synopsis">
          <el-input type="textarea" v-model="addBookform.synopsis" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="书籍封面" :label-width="formLabelWidth" prop="picture">
          <el-input v-model="addBookform.picture" autocomplete="off"></el-input>
        </el-form-item> -->
        <!-- <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="addBookform.picture" :src="addBookform.picture" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> -->
        <el-form-item label="书籍封面" :label-width="formLabelWidth" prop="picture">
          <el-upload action="#" ref="upload" list-type="picture-card" :file-list="fileList" :on-change="handleChange" :limit="1" :on-exceed="handleExceed" :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                  <i class="el-icon-download"></i>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="addBookform.picture" alt="" />
          </el-dialog>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closefrom">取 消</el-button>
        <el-button type="primary" @click="sumbitAddNewBook('addBookform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { postAddNewBookAPI } from "@/api/user.js";

export default {
  name: "UaerAddNewBook",
  props: {
    ifopen: {
      type: Boolean,
      default() {
        return false;
      },
    },
    useruid: {
      type: String,
      default() {
        return 0;
      },
    },
  },
  data() {
    return {
      dialogFormVisible: this.ifopen, //是否打开模态表单
      addBookform: {
        useruid: this.useruid,
        bookid: -1,
        bookname: "",
        picture: "",
        synopsis: "",
      },
      addBookRules: {
        //校验规则
        bookname: [{ required: true, message: "请输入书籍名称" }],
        picture: [{ required: true, message: "请选择书籍图片" }],
        synopsis: [{ required: true, message: "请输入书籍简介" }],
      },
      formLabelWidth: "120px",
      // dialogImageUrl: "",
      fileList: [],
      dialogVisible: false, //是否查看图片
      disabled: false,
      ifaddinfo: false, //判断是否为刚进页面未生成校验
    };
  },
  created() {},
  watch: {
    ifopen(value) {
      this.dialogFormVisible = value;
      // console.log("watch检测到并修改的dialogFormVisible:", this.dialogFormVisible);
      if (value) {
        this.openfrom();
      }
    },
  },
  methods: {
    // 模态表单打开,初始化
    openfrom() {
      // 清空默认值
      this.addBookform = { useruid: this.useruid, bookid: -1, bookname: "", picture: "", synopsis: "" };
      if (this.ifaddinfo) {
        // 根据是否生成校验，是：重置表单验证
        this.$refs["addBookform"].resetFields();
      }
    },
    // 模态表单关闭
    closefrom() {
      this.dialogFormVisible = false;
      this.$emit("toclose", false); //将关闭状态发送给父级
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          // done();
          this.closefrom();
        })
        .catch((_) => {});
    },
    // 提交新增/编辑
    sumbitAddNewBook(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          // console.log("提交成功!!");
          // 调用新增/编辑接口
          this.postBookEdit(this.addBookform);
          this.submitUpload(); // 提交图片
          this.closefrom(); // 关闭表单模态
          this.ifaddinfo = true;
        } else {
          // console.log("提交失败!!");
          this.$message({ type: "error", showClose: true, offset: 80, message: "请填写正确信息!" });
        }
      });
    },
    // 添加图片
    handleChange(file) {
      // 将图片路径提交
      this.addBookform.picture = file.url;
    },
    // 图片超出限制
    handleExceed(file, fileList) {
      // console.log(file);
      // this.fileList = fileList.slice(1);
      this.fileList = [];
    },
    // 图片上传到服务器
    submitUpload() {
      // console.log("提交的file", this.$refs.upload);
      this.$refs.upload.submit();
    },
    // handlePreview(file) {
    //   console.log(file);
    // },

    // 图片预览
    handlePictureCardPreview(file) {
      this.addBookform.picture = file.url;
      this.dialogVisible = true;
    },
    // 图片下载
    handleDownload(file) {
      console.log(file);
    },
    // 图片删除
    handleRemove(file) {
      // console.log(file);
      this.fileList = [];
    },
    // ==接口操作==
    // 调用新增/编辑接口
    postBookEdit(row) {
      postAddNewBookAPI(row)
        .then((res) => {
          // console.log(res.msg);
          if (res.code !== 200) return this.$message({ type: "error", showClose: true, offset: 80, message: res.msg });
          this.$message({ type: "success", showClose: true, offset: 80, message: res.msg });
          // this.getuserlist(this.formInline); // 更新数据
          this.$emit("toupdate"); //将表单提交成功发送给父级
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
