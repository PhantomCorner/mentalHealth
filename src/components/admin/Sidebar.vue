<template>
  <el-aside width="200px" class="sidebar">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
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
