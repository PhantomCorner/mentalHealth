<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card></el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
import {getAnalyticsOverview} from "@/api/admin";

const analyticsData = ref(null);

onMounted(async () => {
  const response = await getAnalyticsOverview();
  analyticsData.value = response;
  console.log(analyticsData.value);
});
</script>
