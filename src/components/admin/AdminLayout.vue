<script setup lang="ts">
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";
</script>

<template>
  <div class="admin-layout">
    <el-container>
      <Sidebar />
      <el-container>
        <el-header>
          <Navbar />
        </el-header>
        <el-main>
          <router-view class="content-container"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.admin-layout {
  .el-container {
    height: 100%;
  }
  .el-header {
    padding: 0;
  }

  height: 100vh;
  .content-container {
    min-height: calc(100% - 64px);
    background-color: #ecf0f1;
  }
}
</style>
