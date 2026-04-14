<template>
  <div>
    <PageHead>
      <template #title>Articles</template>
      <template #buttons>
        <el-button type="primary">Create New Article</el-button>
        <el-button type="default">Edit</el-button>
      </template>
    </PageHead>
  </div>
</template>

<script setup lang="ts">
import PageHead from "../../components/PageHead.vue";
</script>
