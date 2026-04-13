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
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.admin-layout {
  height: 100vh;
}
</style>
