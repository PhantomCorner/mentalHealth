<template>
  <el-form :model="formData">
    <template v-for="item in formItem" :key="item.label">
      <el-form-item :label="item.label" :prop="item.prop">
        <component
          :is="isComp(item.comp)"
          v-model="formData[item.prop]"
          :placeholder="item.placeholder">
          <template v-if="item.comp === 'select'">
            <el-option
              v-for="option in item.options || []"
              :key="option.value"
              :label="option.label"
              :value="option.value" />
          </template>
        </component>
      </el-form-item>
    </template>
  </el-form>
</template>

<script lang="ts" setup>
import {ref, reactive, computed, watch} from "vue";
interface FormItem {
  label: string;
  prop: string;
  comp: string;
  value?: any;
  placeholder?: string;
  options?: Array<{label: string; value: any}>;
}
const formData = reactive<Record<string, any>>({});

const props = defineProps<{
  formItem: FormItem[];
}>();
const isComp = (comp: string) => {
  const compMap: Record<string, any> = {
    input: "el-input",
    select: "el-select",
  };
  return compMap[comp] || "el-input";
};
</script>
