<template>
  <el-dialog
    v-model="dialogVisible"
    title="Article Form"
    width="50%"
    :before-close="handleClose"
    destroy-on-close>
    <el-form :model="form" label-width="120px">
      <h1>1234</h1>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import {ref, reactive, computed} from "vue";
import {ElMessage} from "element-plus";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);
const dialogVisible = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>
