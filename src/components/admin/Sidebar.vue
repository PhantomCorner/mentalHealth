<template>
  <el-aside width="248px" class="sidebar">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <div class="brand">
        <el-image
          class="brand-icon"
          src="https://cdn-icons-png.flaticon.com/512/4712/4712039.png"
          alt="logo" />
        <div class="info-card">
          <h1>Mental Health Assistant</h1>
          <p>Admin panel</p>
        </div>
      </div>
      <el-menu-item
        v-for="route in router.options.routes[0].children"
        :index="route.path"
        :key="route.path"
        @click="router.push(route.path)">
        <el-icon>
          <component :is="route.meta?.icon" />
        </el-icon>
        {{ route.meta?.title }}
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
const router = useRouter();
// console.log(router);

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>
<style scoped lang="scss">
.sidebar {
  background-color: #2c3e50;
  .brand {
    display: flex;
    align-items: center;
    padding: 8px;
    .brand-icon {
      width: 50px;
      height: 40px;
      margin-right: 8px;
    }
    .info-card {
      h1 {
        font-size: 24px;
        margin: 0;
      }
      p {
        color: #bdc3c7;
        font-size: 14px;
        margin: 0;
      }
    }
  }
}
</style>
