<template>
  <div>
    <main-sidebar>
      <!-- 内容区域 -->
      <div class="content">
        <div class="funtable">
          <div class="btngroup">
            <button class="name open" @click="openNameBtn()">名</button>
            <div class="namebtnlist close">
              <button>男</button>
              <button>女</button>
              <button>地</button>
            </div>
          </div>
          <div class="btngroup">
            <button>A</button>
            <button>B</button>
          </div>
        </div>
        <!-- 
        <textarea
          class="textarea"
          placeholder="从这里开始"
          :value="text"
          @change="onChange($event)"
          @select="onSelect($event)"
          @focus="onFocus($event)"
          @blur="onBlur($event)"
          maxlength="5000"
        ></textarea> -->
        <div contenteditable="true" class="textarea" @blur="onBlur($event)" @drop="onDrop($event)" placeholder="默认文字">
          <!-- {{ text }} -->
        </div>
        <!-- <div contenteditable="true" class="textarea" ondragenter="return false;" ondragleave="return false;" ondragover="return false;" @drag="drag($event)">
          <div>{{ text }}</div>
        </div> -->
      </div>
      <div class="save">
        <div @click="SaveText()" class="savebtn">保存</div>
      </div>
    </main-sidebar>
  </div>
</template>

<script>
import MainSidebar from "@/components/content/mainSidebar/MainSidebar.vue";

export default {
  name: "UserWriting",
  components: { MainSidebar },
  data() {
    return {
      text: "...",
      ischange: false,
    };
  },
  // watch: {
  //   text(value) {
  //     console.log(value);
  //     this.text = value;
  //   },
  // },
  // 设置了keep-active，this.text将保存数据
  //   activated() {
  //     console.log("我进来了了");
  //     const text = window.localStorage.getItem("TextCache");
  //     if (text) {
  //       this.text = text;
  //     }
  //   },
  //   deactivated() {
  //     console.log("我离开了");
  //     window.localStorage.setItem("TextCache", this.text);
  //   },
  methods: {
    // 保存按钮操作
    SaveText() {
      if (this.ischange) {
        console.log("保存text");
        const eve = document.querySelector(".textarea");
        this.text = eve.innerText;
        this.$message({ type: "success", showClose: true, offset: 80, message: "已取到最新内容，可将内容进行储存" });
        // 进行存储操作后;
        this.ischange = false;
      } else {
        this.$message({ type: "error", showClose: true, offset: 80, message: "无最新内容" });
      }
    },
    // 名称相关事件
    // 打开按钮列表
    openNameBtn() {
      const namebtn = document.querySelector(".namebtnlist");
      namebtn.classList.toggle("close");
    },
    // 内容修改后，文本域失去焦点时
    // onChange(event) {
    //   //   console.log(event.target.value);
    //   this.text = event.target.value;
    //   console.log("已取到最新内容，可将内容进行储存");
    //   console.log(" this.text: ", this.text);
    //   this.$message({ type: "success", showClose: true, offset: 80, message: "已取到最新内容，可将内容进行储存" });
    // },
    // 获得焦点
    onFocus(event) {},
    // 失去焦点，检测更新文本
    onBlur(event) {
      if (event.target.innerText !== this.text && event.target.innerText.length > 0) {
        // console.log("判断通过");
        // 检测到内容更新
        this.ischange = true;
        // console.log("onBlur检测到最新内容");
        // this.text = event.target.innerText;
        // this.$message({ type: "success", showClose: true, offset: 80, message: "已取到最新内容，可将内容进行储存" });
        // } else {
        //   this.$message({ type: "error", showClose: true, offset: 80, message: "无最新内容" });
      }
    },
    // 选中文字时，获取选中内容
    // onSelect(event) {
    //   // 整个文本域内容 event.target.value, 换行\n分隔
    //   let e = event || window.event; //兼容写法
    //   let target = e.target || e.srcElement; //兼容写法
    //   let start = target.selectionStart;
    //   let end = target.selectionEnd;
    //   let value = target.value;
    //   //   console.log("选中起始位置:", start, "选中结束位置:", end);
    //   let selectVal = "";
    //   if (value && end != 0) {
    //     //防止 没选中
    //     selectVal = value.slice(start, end);
    //   }
    //   console.log("选中文字:", selectVal);
    //   this.$message({ type: "warning", showClose: true, offset: 80, message: selectVal });
    // },
    // 拖入元素
    onDrop(event) {
      console.log("监听到拖入");
      // console.log(event.target.children);
      // vue获取HTMLCollection对象，存在虚拟DOM渲染问题，在保证渲染完成再访问节点
      this.$nextTick(() => {
        setTimeout(() => {
          const a = event.target.children[0];
          if (a.tagName !== "SPAN") return;
        }, 0);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  margin-top: 100px;
  padding: 0 70px;
  position: relative;
  height: calc(100vh - 100px);
  overflow: hidden;
  // 按钮框
  .funtable {
    width: 100%;
    height: 40px;
    // padding: 5px 0 0;
    border: 1px solid #66666660;
    background-color: var(--sidebar-color);
    display: flex;
    .btngroup {
      border-left: 1px solid #66666660;
      display: flex;
      button.open {
        color: var(--text-color);
        background-color: var(--sidebar-color);
      }
      .namebtnlist {
        width: 120px;
        opacity: 1;
        transition: all 0.5s ease;
      }
      .namebtnlist.close {
        width: 0;
        opacity: 0;
      }
      button {
        width: 40px;
        height: 40px;
        border: 0;
        color: var(--text-color);
        background-color: transparent;
        &:hover {
          cursor: pointer;
          color: var(--sidebar-color);
          background-color: var(--toggle-color);
        }
      }
    }
  }
  // 文本框
  .textarea {
    position: absolute;
    top: 40px;
    bottom: 10px;
    left: 70px;
    right: 70px;
    // width: 100%;
    // height: calc(13em * 2);
    line-height: 2;
    padding: 1em 10px;
    font-size: 22px;
    // background:url(images/logo.gif) no-repeat right top;
    color: var(--text-color);
    background-color: var(--sidebar-color);
    border: 1px solid #66666660;
    border-radius: 0 0 5px 5px;
    outline: none; /*去除点击出现轮廓颜色*/
    resize: none; /*去掉右下角的可拉伸变大小的图标和功能*/
    caret-color: red; /* 光标颜色 */
    overflow: auto;
  }
}
.save {
  position: absolute;
  right: 20px;
  bottom: 40px;
  .savebtn {
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 6px;
    text-align: center;
    color: var(--sidebar-color);
    background-color: var(--primary-color);
    cursor: pointer;
    transition: var(--tran-03);
    &:hover {
      width: 80px;
      color: var(--text-color);
      background-color: var(--primary-color-light);
    }
  }
}
</style>
