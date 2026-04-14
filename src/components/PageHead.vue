<template>
  <div class="page-head">
    <p class="page-title">
      <slot name="title">{{ props.title }}</slot>
    </p>
    <div class="action-btn">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: "Page Title",
  },
});
</script>
<style scoped lang="scss">
.page-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #ecf0f1;
  .page-title {
    font-size: 24px;
    color: #2c3e50;
    font-weight: bold;
  }

  .action-btn {
    display: flex;
    gap: 8px;
  }
}
</style>
