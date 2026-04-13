<template>
  <el-aside width="248px" class="sidebar">
    <el-menu
      :default-active="activeMenu"
      :router="true"
      class="el-menu-vertical-demo">
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
        v-for="route in menuRoutes"
        :index="`${basePath}/${route.path}`"
        :key="route.path">
        <el-icon>
          <component :is="route.meta?.icon" />
        </el-icon>
        {{ route.meta?.title }}
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script lang="ts" setup>
import {computed} from "vue";
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();

const adminRoute = router.options.routes[0];
const basePath = adminRoute.path;
const menuRoutes = adminRoute.children ?? [];
const activeMenu = computed(() => route.path);
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
