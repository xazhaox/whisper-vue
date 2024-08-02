<template>
  <div class="card content-box">
    <a-alert
      title="SVG 图标目前使用 vite-plugin-svg-icons 插件完成，官方文档请查看 ：https://github.com/vbenjs/vite-plugin-svg-icons"
      type="warning"
      :closable="false"
    />
    <div class="icon-list">
      <SvgIcon name="xianxingdaoyu" />
    </div>
    <a-descriptions title="配置项 📚" :column="1" border>
      <a-descriptions-item label="name"> 图标的名称，svg 图标必须存储在 src/assets/icons 目录下 </a-descriptions-item>
      <a-descriptions-item label="prefix"> 图标的前缀，默认为 "icon" </a-descriptions-item>
      <a-descriptions-item label="iconStyle"> 图标的样式，默认样式为 { width: "100px", height: "100px" } </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script setup lang="ts" name="svgIcon">
import SvgIcon from "@/components/SvgIcon/index.vue";
</script>

<style scoped lang="scss">
@import "./index";
</style>
