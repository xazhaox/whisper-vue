<template>
  <div class="not-container">
    <img src="@/assets/images/404.png" class="not-img" alt="404" />
    <div class="not-detail">
      <h2>404</h2>
      <h4>抱歉，您访问的页面不存在~🤷‍♂️🤷‍♀️</h4>
      <a-button type="primary" @click="router.back"> 返回上一页 </a-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="404">
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped lang="scss">
@import "./index";
</style>
