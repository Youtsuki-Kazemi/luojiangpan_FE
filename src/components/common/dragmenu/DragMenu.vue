<template>
  <div>
    <div class="dragmenu">
      <div v-if="!ismenuopen" class="dragmenu-toggle" @click="dragMenu" @mousedown="mouseDown">
        <i class="iconfont icon-modular icon"></i>
      </div>
      <div v-else class="dragmenu-toggle" @click="dragMenu" @mousedown="mouseDown">
        <i class="iconfont icon-close icon"></i>
      </div>
      <div class="dragmenu-list" style="width: 50px; height: 50px; transform: translate(0px, 0px)">
        <!-- <div class="dragmenu-item" style="--i: 0" @click="dragMenuTab">
          <i class="iconfont icon-user icon" slot="item-icon"></i>
        </div>
        <div class="dragmenu-item" style="--i: 1" @click="dragMenuTab">
          <i class="iconfont icon-map icon" slot="item-icon"></i>
        </div>
        <div class="dragmenu-item" style="--i: 2" @click="dragMenuTab">
          <i class="iconfont icon-link icon" slot="item-icon"></i>
        </div>
        <div class="dragmenu-item" style="--i: 3" @click="dragMenuTab">
          <i class="iconfont icon-setting icon" slot="item-icon"></i>
        </div> -->
        <drag-menu-item itemid="0" class="dragmenu-item" style="--i: 0" @activeitem="activeItem" :class="{ active: isActive('0') }">
          <i class="iconfont icon-user icon" slot="item-icon" @click="activeItem('0')"></i>
          <div class="dragmenu-tab" slot="item-tab">
            <h2>随机名称生成</h2>
            <div class="nameform">
              <label for="sex" class="label">姓别:</label>
              <label class="sex"><input type="radio" value="0" v-model="submitForm.sex" />男</label>
              <label class="sex"><input type="radio" value="1" v-model="submitForm.sex" />女</label>
              <label for="last_name" class="label">自定义姓氏:</label>
              <input type="text" class="input" id="last_name" name="last_name" v-model="submitForm.last_name" minlength="1" maxlength="4" size="10" />
              <br />
              <!-- <label for="namelen">名字长度</label>
            <select name="len" id="namelen" v-model="submitForm.len">
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select> -->
              <label for="namelen" class="label">生成个数:</label>
              <select name="num" class="input" id="namenum" v-model="submitForm.num">
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
              <input class="subbtn" type="button" value="生成" @click="submitCreat" />
            </div>
            <div class="namelist">
              <p v-for="(o, index) in namelist" :key="index">
                {{ index }}
                <i class="iconfont icon-edit-filling copyitem" @click="fuzibtn(index)"></i>
              </p>
            </div>
          </div>
        </drag-menu-item>
        <drag-menu-item itemid="1" class="dragmenu-item" style="--i: 1" @activeitem="activeItem" :class="{ active: isActive('1') }">
          <i class="iconfont icon-map icon" slot="item-icon" @click="activeItem('1')"></i>
          <div class="dragmenu-tab" slot="item-tab"></div>
        </drag-menu-item>
        <drag-menu-item itemid="2" class="dragmenu-item" style="--i: 2" @activeitem="activeItem" :class="{ active: isActive('2') }">
          <i class="iconfont icon-link icon" slot="item-icon" @click="activeItem('2')"></i>
          <div class="dragmenu-tab" slot="item-tab">
            <h2>素材灵感参考网站</h2>
            <div class="linklist">
              <ul>
                <li>
                  <a href="https://www.mx-xz.com/" target="_blank">
                    墨星写作网
                    <i class="iconfont icon-sign-out"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.gushiwen.cn/gushi/" target="_blank">
                    古诗文网
                    <i class="iconfont icon-sign-out"></i>
                  </a>
                </li>
                <li>
                  <a href="http://www.sucaixiang.com/" target="_blank">
                    素材巷
                    <i class="iconfont icon-sign-out"></i>
                  </a>
                </li>
                <li>
                  <a href="https://cbaigui.com/" target="_blank">
                    纪妖
                    <i class="iconfont icon-sign-out"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.allhistory.com/" target="_blank">
                    全历史
                    <i class="iconfont icon-sign-out"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </drag-menu-item>
        <drag-menu-item itemid="3" class="dragmenu-item" style="--i: 3" @activeitem="activeItem" :class="{ active: isActive('3') }">
          <i class="iconfont icon-setting icon" slot="item-icon" @click="activeItem('3')"></i>
          <div class="dragmenu-tab" slot="item-tab"></div>
        </drag-menu-item>
        <!-- tab标签页 -->
        <!-- <div class="dragmenu-tab">
          <div>名字生成</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import DragMenuItem from "@/components/common/dragmenu/DragMenuItem.vue";
import { getManNameAPI, getWomenNameAPI } from "@/api/create.js";

export default {
  name: "DragMenu",
  components: { DragMenuItem },
  data() {
    return {
      ismenuopen: false,
      itemid: "",
      submitForm: {
        sex: "0",
        num: "5",
        last_name: "",
        // len: "2",
      },
      namelist: {},
    };
  },
  methods: {
    // 切换菜单状态
    dragMenu(e) {
      const body = document.querySelector("body");
      const dragmenu = body.querySelector(".dragmenu");
      const list = dragmenu.querySelector(".dragmenu-list");
      const item = list.querySelectorAll(".dragmenu-item");
      dragmenu.classList.toggle("active");
      this.ismenuopen = !this.ismenuopen;
      // 回到初始状态位置
      if (!this.ismenuopen) {
        list.style.width = "50px";
        list.style.height = "50px";
        list.style.transform = "translate(0, 0)";
      } else {
        if (e.pageY <= 110 || window.innerHeight - e.pageY <= 110) {
          list.style.width = "240px";
          list.style.height = "70px";
          list.style.transform = "translate(60px, 0px)";
          Object.values(item).map((n) => {
            n.style.transform = "translate(calc(55px * var(--i) + 10px), 10px)";
          });
          if (window.innerWidth - e.pageX <= 290) {
            list.style.transform = "translate(-250px, 0px)";
          }
        } else {
          list.style.width = "70px";
          list.style.height = "240px";
          list.style.transform = "translate(60px, 0px)";
          Object.values(item).map((n) => {
            n.style.transform = "translate(10px, calc(55px * var(--i) + 10px))";
          });
          if (window.innerWidth - e.pageX <= 290) {
            list.style.transform = "translate(-75px, 0px)";
          }
        }
      }
    },
    // 鼠标按下事件
    mouseDown(e) {
      const body = document.querySelector("body");
      const dragmenu = body.querySelector(".dragmenu");
      const list = dragmenu.querySelector(".dragmenu-list");
      const item = list.querySelectorAll(".dragmenu-item");
      const x = e.pageX - dragmenu.offsetLeft;
      const y = e.pageY - dragmenu.offsetTop; //鼠标位置相对于按钮位置的运动距离
      // 定义对象位置
      function mousemove(e) {
        // console.log(e.pageX, e.pageY);
        if (e.clientX - x < 100) {
          //到左边界时
          document.removeEventListener("mousemove", mousemove);
          dragmenu.style.left = "110px";
          return;
        }
        if (window.innerWidth - (e.clientX - x) < 60) {
          //到右边界时
          document.removeEventListener("mousemove", mousemove);
          dragmenu.style.left = window.innerWidth - 70 + "px";
          return;
        }
        if (e.clientY - y < -100) {
          //到上边界时
          document.removeEventListener("mousemove", mousemove);
          dragmenu.style.top = "-90px";
          return;
        }
        if (window.innerHeight - (e.clientY - y) < 160) {
          //到下边界时
          document.removeEventListener("mousemove", mousemove);
          dragmenu.style.top = window.innerHeight - 170 + "px";
          return;
        }
        // console.log(dragmenu.offsetLeft, dragmenu.offsetTop);
        // console.log(e.clientY - y);
        // console.log(window.innerHeight);
        if (e.pageY <= 110 || window.innerHeight - e.pageY <= 110) {
          list.style.width = "240px";
          list.style.height = "70px";
          list.style.transform = "translate(60px, 0px)";
          Object.values(item).map((n) => {
            n.style.transform = "translate(calc(55px * var(--i) + 10px), 10px)";
          });
          if (window.innerWidth - e.pageX <= 290) {
            list.style.transform = "translate(-250px, 0px)";
          }
        } else {
          list.style.width = "70px";
          list.style.height = "240px";
          list.style.transform = "translate(60px, 0px)";
          Object.values(item).map((n) => {
            n.style.transform = "translate(10px, calc(55px * var(--i) + 10px))";
          });
          if (window.innerWidth - e.pageX <= 290) {
            list.style.transform = "translate(-75px, 0px)";
          }
        }
        dragmenu.style.left = e.clientX - x + "px";
        dragmenu.style.top = e.clientY - y + "px";
      }
      // 监听移动
      document.addEventListener("mousemove", mousemove);
      // 监听弹起
      document.addEventListener("mouseup", function () {
        document.removeEventListener("mousemove", mousemove); //移除监听
      });
    },
    //
    // 获取子组件点击的itemid
    activeItem(id) {
      if (this.itemid == id) {
        this.itemid = "-1";
      } else {
        this.itemid = id;
      }
    },
    // 动态绑定active
    isActive(value) {
      if (value == this.itemid) {
        return true;
      }
    },
    // 复制按钮
    fuzibtn(name) {
      navigator.clipboard.writeText(name).then((r) => {
        // alert("复制成功", r);
        return this.$message({ type: "success", showClose: true, offset: 80, message: `已将“${name}”复制到剪切板` });
      });
    },
    // ==网络请求==
    // 按性别选择
    submitCreat() {
      if (this.submitForm.sex == "0") {
        const { num, last_name } = this.submitForm;
        this.getReturnManName({ num, last_name });
      } else {
        const { num, last_name } = this.submitForm;
        this.getReturnWomenName({ num, last_name });
      }
    },
    // 调用获取男性姓名接口
    getReturnManName({ num, last_name }) {
      getManNameAPI({ num, last_name })
        .then((res) => {
          // console.log("res", res);
          if (res.code !== 200) return this.$message({ type: "error", showClose: true, offset: 80, message: res.msg });
          // const list = res.namelist;
          this.namelist = { ...res.namelist };
          // const a = Object.assign(this.namelist, list);
        })
        .catch((err) => {
          // console.log(err);
          this.$message({ type: "error", showClose: true, offset: 80, message: "链接超时，请稍后重试" });
        });
    },
    // 调用获取女性姓名接口
    getReturnWomenName({ num, last_name }) {
      getWomenNameAPI({ num, last_name })
        .then((res) => {
          // console.log("res", res);
          if (res.code !== 200) return this.$message({ type: "error", showClose: true, offset: 80, message: res.msg });
          this.namelist = { ...res.namelist };
          // const a = Object.assign(this.namelist, list);
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
.dragmenu {
  position: fixed;
  top: 100px;
  left: 100px;
  z-index: 99;
  width: 50px;
  height: 250px;
  display: flex;
  align-items: center;
  // overflow: hidden;
  // transition: var(--tran-03);
  .dragmenu-toggle {
    position: absolute;
    // margin: 5px;
    width: 50px;
    height: 50px;
    border: 1px solid var(--toggle-color);
    border-radius: 6px;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
    // font-size: 1.5rem;
    text-align: center;
    background-color: var(--primary-color);
    cursor: pointer;
    transition: var(--tran-03);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9;
    .icon {
      font-size: 20px;
      color: var(--text-color-2);
      transition: var(--tran-03);
    }
    &:hover .icon {
      transform: rotate(90deg);
    }
  }
  .dragmenu-list {
    position: relative;
    // top: 0;
    // left: 0;
    width: 50px;
    height: 50px;
    border-radius: 6px;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
    // background-color: var(--label-color);
    // display: flex;
    // flex-direction: row; //水平向右排列
    // justify-content: space-around;
    // justify-content: center;
    // align-items: center;
    opacity: 0;
    transform-origin: 50% 50%; //原点位移
    transform: translate(0, 0); //列表起始位置
    transition: var(--tran-03);
    // transition: 2s;
    .dragmenu-item {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      // background-color: transparent;
      background-color: var(--label-color);
      width: 50px;
      height: 50px;
      border-radius: 6px;
      text-align: center;
      line-height: 50px;
      // list-style: none;
      cursor: pointer;
      // transform-origin: 70px; //原点位移
      transform: translate(10px, 0);
      transition: var(--tran-03);
      // transition-delay: calc(0.1s * var(--i)); //延迟
      .icon {
        font-size: 1.5rem;
        color: var(--text-color);
        // transform: translate(10px, calc(-55px * var(--i) + 10px));
        transition: var(--tran-03);
      }
      &:hover {
        background-color: var(--primary-color);
        .icon {
          color: var(--sidebar-color);
        }
      }
      &.active {
        background-color: var(--primary-color-light);
        .icon {
          color: var(--text-color);
        }
        &::after {
          content: "";
          position: fixed;
          left: 55px;
          top: 5px;
          width: 0px;
          height: 0px;
          border-top: 20px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 20px solid transparent;
          border-left: 13px solid var(--primary-color-light);
        }
      }
      .dragmenu-tab {
        display: none;
        position: absolute;
        width: 0px;
        height: 0px;
        transform: translate(65px, -65px);
        transition: var(--tran-03);
      }
    }
  }
}
.dragmenu.active {
  top: 100px;
  left: 100px;
  width: 250px;
  height: 250px;
  // transform: translate(100px, calc(100px - (245px - 50px) / 2));
  // .dragmenu-toggle {
  // }
  .dragmenu-list {
    width: 70px; //---
    height: 240px; //---
    background-color: var(--label-color);
    opacity: 1;
    transform: translate(60px, 0px); //列表激活位置//---
    .dragmenu-item {
      border: 1px solid var(--toggle-color);
      // transform: rotate(calc(270deg / 4 * var(--i)));
      transform: translate(10px, calc(55px * var(--i) + 10px));
      &.active .dragmenu-tab {
        display: block;
        position: absolute;
        background-color: var(--label-color);
        width: 500px; //---
        height: 500px; //---
        padding: 20px;
        border: 1px solid var(--toggle-color);
        border-radius: 6px;
        text-align: left;
        // z-index: 99;
        transform: translate(65px, -65px);
        transition: var(--tran-03);
        cursor: auto;
        h2 {
          font-weight: 800;
          color: var(--text-color);
        }
        //===
        .nameform {
          position: relative;
          padding: 0 10px;
          background-color: var(--deep-color);
          border-radius: 6px;
          border: 1px solid var(--toggle-color);
          color: var(--text-color);
          label.label {
            display: inline-block;
            padding: 0 10px 0 20px;
            // min-width: 70px;
            // text-align: right;
            font-weight: 600;
          }
          label.sex {
            margin: 0 8px;
            cursor: pointer;
            input {
              width: 16px;
            }
          }
          .input {
            font-size: 17px;
            border-radius: 5px;
            border: 1px solid var(--deep-color);
          }
          .subbtn {
            position: absolute;
            left: 40%;
            top: 85px;
            width: 100px;
            height: 30px;
            background-color: var(--sidebar-color);
            border: 1px solid var(--toggle-color);
            border-radius: 5px;
            box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
            color: var(--text-color);
            font-weight: 600;
            font-size: 15px;
            cursor: pointer;
            &:hover {
              background-color: var(--primary-color);
              color: var(--text-color-2);
            }
          }
        }
        .namelist {
          margin-top: 20px;
          padding: 0 20px;
          width: 100%;
          height: 270px;
          background-color: var(--deep-color);
          overflow: scroll;
        }
        //===
        .linklist {
          position: relative;
          padding: 0 10px;
          background-color: var(--deep-color);
          border-radius: 6px;
          border: 1px solid var(--toggle-color);
          color: var(--text-color);
          li a {
            color: var(--primary-color);
            font-weight: 600;
          }
        }
      }
    }
  }
}
</style>
