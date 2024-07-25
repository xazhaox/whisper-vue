<template>
  <a-space wrap>
    <a-button type="primary">Primary Button</a-button>
    <a-button>Default Button</a-button>
    <a-button type="dashed">Dashed Button</a-button>
    <a-button type="text">Text Button</a-button>
    <a-button type="link">Link Button</a-button>
  </a-space>

  <UpCircleFilled />
  <DownCircleFilled />

  <a-space>
    <home-outlined />
    <setting-filled />
    <smile-outlined />
    <sync-outlined spin />
    <smile-outlined :rotate="180" />
    <loading-outlined />
  </a-space>
</template>

<script setup lang="ts">
import { HomeOutlined, SettingFilled, SmileOutlined, SyncOutlined, LoadingOutlined, UpCircleFilled } from "@ant-design/icons-vue";
</script>

<style scoped></style>
