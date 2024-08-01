<template>
  <div class="login-btn">
    <a-button round size="large" type="primary" @click="login()">登录</a-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { HOME_URL } from "@/config";
import { useUserStore } from "@/stores/modules/user";

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
