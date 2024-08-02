<template>
  <!-- 折叠/展开菜单 -->
  <a-button type="text" @click="changeCollapse">
    <SvgIcon name="MenuFoldOutlined" style="width: 17px; height: 22px" />
  </a-button>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon/index.vue";
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
