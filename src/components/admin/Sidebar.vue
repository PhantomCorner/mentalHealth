<script lang="ts" setup>
import {computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import useAdminStore from "@/store/admin";

const router = useRouter();
const route = useRoute();
const adminStore = useAdminStore();
const isCollapse = computed(() => adminStore.sidebarCollapsed);
const adminRoute = router.options.routes[0];
const basePath = adminRoute.path;
const menuRoutes = adminRoute.children ?? [];
const activeMenu = computed(() => route.path);
</script>

<template>
  <el-aside
    :width="isCollapse ? '72px' : '248px'"
    :class="{'is-collapse': isCollapse}"
    class="sidebar">
    <el-menu
      :default-active="activeMenu"
      :router="true"
      :collapse="isCollapse"
      :collapse-transition="false"
      background-color="transparent"
      text-color="#cbd5e1"
      active-text-color="#f8fafc"
      class="sidebar-menu">
      <div class="brand">
        <el-image
          class="brand-icon"
          src="https://cdn-icons-png.flaticon.com/512/4712/4712001.png"
          alt="logo" />
        <div v-show="!isCollapse" class="info-card">
          <h1>Mental Health Assistant</h1>
          <p>Admin panel</p>
        </div>
      </div>
      <el-menu-item
        v-for="route in menuRoutes"
        :index="`${basePath}/${route.path}`"
        :key="route.path"
        class="menu-item">
        <el-icon>
          <component :is="route.meta?.icon" />
        </el-icon>
        <span>{{ route.meta?.title }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style lang="scss">
.sidebar {
  height: 100%;
  overflow: hidden;
  background: #f8fafc;
  border-right: 1px solid rgba(148, 163, 184, 0.16);
  transition: width 0.2s ease;

  .sidebar-menu {
    height: 100%;
    border-right: none;
    background: transparent;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 72px;
    padding: 16px 14px 14px;

    .brand-icon {
      width: 42px;
      height: 42px;
      flex-shrink: 0;
      border-radius: 12px;
      background: transparent;
    }

    .info-card {
      min-width: 0;

      h1 {
        color: #000;
        font-size: 14px;
        line-height: 1.2;
        font-weight: 700;
        margin: 0;
      }

      p {
        margin: 4px 0 0;

        font-size: 12px;
      }
    }
  }
}

.sidebar-menu .el-menu-item {
  margin: 6px 10px;
  border-radius: 12px;
  color: #000;
}

.sidebar-menu .el-menu-item:hover {
  background-color: rgba(59, 130, 246, 0.16);
}

.sidebar-menu .el-menu-item.is-active {
  background: linear-gradient(
    90deg,
    rgba(59, 130, 246, 0.28),
    rgba(14, 165, 233, 0.2)
  );
}

.sidebar-menu .el-menu-item .el-icon {
  margin-right: 10px;
}

.sidebar.is-collapse .brand {
  justify-content: center;
}

.sidebar.is-collapse .sidebar-menu .el-menu-item {
  margin: 6px 8px;
  justify-content: center;
  padding: 0;
  color: #000;
}

.sidebar.is-collapse .sidebar-menu .el-menu-item .el-icon {
  margin-right: 0;
}
</style>
