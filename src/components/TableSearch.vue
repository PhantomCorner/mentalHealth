<template>
  <el-form :model="formData" ref="ruleFormRef">
    <el-row :gutter="24">
      <template v-for="item in formItemAttrs" :key="item.label">
        <el-col v-bind="item.col">
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
        </el-col>
      </template>
    </el-row>
    <el-row>
      <el-button type="primary" @click="handleSearch">Search</el-button>
      <el-button type="default" @click="handleReset(ruleFormRef)">
        Reset
      </el-button>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
import {ref, reactive, computed} from "vue";
import type {FormInstance, FormRules} from "element-plus";

interface FormItem {
  label: string;
  prop: string;
  comp: string;
  value?: any;
  col?: Record<string, number>;
  placeholder?: string;
  options?: Array<{label: string; value: any}>;
}
interface RuleForm {
  name: string;
  region: string;
  count: string;
  date1: string;
  date2: string;
  delivery: boolean;
  location: string;
  type: string[];
  resource: string;
  desc: string;
}
const formItemAttrs = computed(() => {
  const {formItem} = props;
  formItem.forEach((item) => {
    item.col = {xs: 24, sm: 12, md: 8, lg: 6, xl: 4};
  });
  return formItem;
});
const ruleFormRef = ref<FormInstance>();
const emit = defineEmits(["search"]);
const formData = reactive<Record<string, any>>({});
const props = defineProps<{
  formItem: FormItem[];
}>();
const handleSearch = () => {
  // Emit search event with form data
  console.log(formData);
  emit("search", formData);
};
const handleReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  emit("search", formData);
};
const isComp = (comp: string) => {
  const compMap: Record<string, any> = {
    input: "el-input",
    select: "el-select",
  };
  return compMap[comp] || "el-input";
};
</script>
