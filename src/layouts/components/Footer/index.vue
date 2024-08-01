<!-- 底部 -->
<template>
  <div class="footer flx-center">
    <a
      href="https://github.com/xazhaox/whisper-vue/blob/master/LICENSE"
      target="_blank"
      rel="noopener noreferrer"
      class="a-font-color"
    >
      Copyright MIT © 2024 whisper Technology.
    </a>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "GlobalFooter"
});
</script>

<style scoped>
.a-font-color {
  color: #1f1f1f;
  text-decoration: #1f1f1f;
}
.a-font-color:hover {
  color: #bebeff;
}
</style>
