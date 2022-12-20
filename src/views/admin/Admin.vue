<template>
  <div class="index">
    <el-container>
      <AdminHeader />
      <el-container class="content">
        <AdminMenu />
        <el-container>
          <el-main>
            <BreadCrumb></BreadCrumb>
            <div class="cont">
              <router-view />
            </div>
          </el-main>
          <el-footer><AdminFooter /></el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AdminHeader from "@/components/content/admin/AdminHeader.vue";
import AdminMenu from "@/components/content/admin/AdminMenu.vue";
import AdminFooter from "@/components/content/admin/AdminFooter.vue";
import BreadCrumb from "@/components/common/breadcrumb/BreadCrumb.vue";

export default {
  name: "Admin",
  components: {
    AdminHeader,
    AdminMenu,
    AdminFooter,
    BreadCrumb,
  },
};
</script>

<style lang="less" scoped>
.index {
  width: 100%;
  height: 100%;
  background-color: #d8e3e7;
  .content {
    position: absolute;
    top: 60px;
    bottom: 0;
    width: 100%;
    .cont {
      padding: 20px 0;
    }
  }
}
</style>
