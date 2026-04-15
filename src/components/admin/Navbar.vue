<script setup lang="ts">
import useAdminStore from "@/store/admin";
const userName = "Admin";
const handleCommand = (command: string) => {
  if (command === "logout") {
    // Handle logout logic here
    console.log("Logging out...");
  }
};
const handleCollapse = () => {
  useAdminStore().toggleSidebar();
};
</script>

<template>
  <div class="nav-bar">
    <div class="flex-box">
      <el-button type="text" @click="handleCollapse">
        <el-icon>
          <Expand />
        </el-icon>
      </el-button>
      <p class="page-title">Nav bar</p>
    </div>
    <div class="flex-box dropdown">
      <el-dropdown placement="bottom" @command="handleCommand">
        <div class="flex-box">
          <el-avatar
            src="https://cdn-icons-png.flaticon.com/512/4712/4712039.png"
            alt="avatar"
            size="default" />
          <span style="margin-left: 8px">{{ userName }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- <el-dropdown-item>Profile</el-dropdown-item>
            <el-dropdown-item>Settings</el-dropdown-item> -->
            <el-dropdown-item command="logout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  background-color: #ecf0f1;
  padding: 0 16px;
  .page-title {
    font-size: 24px;
    margin-left: 8px;
    color: #2c3e50;
    font-weight: bold;
  }
  .flex-box {
    display: flex;
    align-items: center;
    justify-self: center;
  }
  .dropdown {
    cursor: pointer;
  }
}
</style>
