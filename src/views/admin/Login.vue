<script lang="ts" setup>
import type {FormInstance, FormRules} from "element-plus";
import {ref} from "vue";
import {login} from "@/api/admin";
const ruleFormRef = ref<FormInstance>();

const formData = ref({
  username: "string",
  password: "string",
});
const formRules: FormRules = {
  username: [
    {required: true, message: "Please input username", trigger: "blur"},
  ],
  password: [
    {required: true, message: "Please input password", trigger: "blur"},
  ],
};
const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid: boolean, fields) => {
    if (valid) {
      login(formData.value)
        .then((res) => {
          if (!res.token) {
            console.log("Login failed: No token received");
            return;
          }
          console.log("Login successful", res);
          localStorage.setItem("token", res.token);
          localStorage.setItem("userInfo", JSON.stringify(res.userInfo));
        })
        .catch((err) => {
          console.log("Login failed", err);
        });
    } else {
      console.log("Validation failed", fields);
    }
  });
};
</script>

<template>
  <div class="login-container">
    <el-button link @click="$router.push('/auth/register')">
      <el-icon><Back /></el-icon>
      Go to Register
    </el-button>
    <el-form
      ref="ruleFormRef"
      :model="formData"
      :rules="formRules"
      label-position="top">
      <h1>Admin Login</h1>
      <p>Please enter your credentials to log in.</p>
      <el-form-item label="Username" prop="username">
        <el-input
          v-model="formData.username"
          placeholder="Please input username"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
          v-model="formData.password"
          type="password"
          placeholder="Please input password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin(ruleFormRef)">
          Login
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
