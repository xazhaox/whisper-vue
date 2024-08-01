<template>
  <!-- 折叠/展开菜单 -->
  <a-button type="text" @click="changeCollapse"><MenuFoldOutlined /></a-button>
</template>

<script setup lang="ts">
import { MenuFoldOutlined } from "@ant-design/icons-vue";
import { useGlobalStore } from "@/stores/modules/global";
import { message } from "ant-design-vue";
message.success("展开/折叠菜单！");

const globalStore = useGlobalStore();
const changeCollapse = () => globalStore.setGlobalState("isCollapse", !globalStore.isCollapse);
</script>

<style scoped lang="scss">
.collapse-icon {
  margin-right: 20px;
  font-size: 22px;
  color: var(--a-header-text-color);
  cursor: pointer;
}
</style>
