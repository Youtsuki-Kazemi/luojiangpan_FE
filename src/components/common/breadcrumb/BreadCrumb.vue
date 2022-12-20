<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index">
          <a :href="item.path">{{ item.name }}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "BreadCrumb",
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped></style>
