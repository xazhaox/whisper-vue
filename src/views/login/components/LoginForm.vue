<template>
  <div class="title-text">
    <h2>欢迎回来 👋🏻</h2>
    <span class="text-muted-foreground">请输入您的帐户信息以开始管理您的项目</span>
  </div>
  <div class="login-form-item">
    <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish" @finish-failed="onFinishFailed">
      <a-form-item name="username">
        <a-input placeholder="Username" v-model:value="formState.username" class="login-item-input-wrapper login-item-input" />
      </a-form-item>

      <a-form-item name="password">
        <a-input-password placeholder="Password" v-model:value="formState.password" class="login-item-input-wrapper" />
      </a-form-item>

      <a-form-item name="remember">
        <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
      </a-form-item>
    </a-form>
  </div>
  <div class="login-btn">
    <a-button round size="large" type="primary" @click="login()">登录</a-button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { HOME_URL } from "@/config";
import { useUserStore } from "@/stores/modules/user";

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: "",
  password: "",
  remember: true
});

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const router = useRouter();
const userStore = useUserStore();

// login
const login = () => {
  try {
    userStore.setToken("X");
    // 4.跳转到首页
    router.push(HOME_URL);
  } finally {
  }
};
</script>

<style scoped lang="scss">
@import "../index";
</style>
