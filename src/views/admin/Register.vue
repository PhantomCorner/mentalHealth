<template>
  <div class="register-container">
    <el-button link @click="$router.push('/auth/login')">
      <el-icon><Back /></el-icon>
      Go to Login
    </el-button>
    <el-form
      ref="ruleFormRef"
      :model="formData"
      :rules="formRules"
      label-position="top">
      <h1>Admin Register</h1>
      <p>Please fill in the form to create an account.</p>
      <el-form-item label="Username" prop="username">
        <el-input
          v-model="formData.username"
          placeholder="Please input username"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
          v-model="formData.password"
          type="password"
          show-password
          placeholder="Please input password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleRegister(ruleFormRef)">
          Register
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import {ref} from "vue";
import type {FormInstance, FormRules} from "element-plus";

const ruleFormRef = ref<FormInstance>();
const formData = ref({
  username: "",
  password: "",
});
const formRules: FormRules = {
  username: [
    {required: true, message: "Please input username", trigger: "blur"},
  ],
  password: [
    {required: true, message: "Please input password", trigger: "blur"},
  ],
};
const handleRegister = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid: boolean, fields) => {
    if (valid) {
      console.log("Registering with", formData.value);
    } else {
      console.log("Validation failed", fields);
    }
  });
};
</script>
