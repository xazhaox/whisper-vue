<template>
  <div class="login-container flx-center">
    <div class="login-form">
      <LoginForm />
    </div>
    <!-- <div class="footer footer-center">
      Copyright MIT © 2024
      <a
        href="https://github.com/xazhaox/whisper-vue/blob/master/LICENSE"
        target="_blank"
        rel="noopener noreferrer"
        class="footer-center"
      >
        &nbsp;whisper xazhao.
      </a>
    </div> -->
  </div>
</template>

<script setup lang="ts" name="login">
import LoginForm from "./components/LoginForm.vue";
</script>

<style scoped lang="scss">
@import "./index";
</style>
