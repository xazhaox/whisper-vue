<template>
  <!-- 折叠/展开菜单 -->
  <a-button type="text" @click="changeCollapse">
    <SvgIcon v-if="state.collapsed" name="SideMenuFoldOutlined" style="width: 17px; height: 22px" />
    <SvgIcon v-else name="MenuFoldOutlined" style="width: 17px; height: 22px" />
  </a-button>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon/index.vue";
import { useGlobalStore } from "@/stores/modules/global";
import { reactive } from "vue";

const state = reactive({
  collapsed: false as boolean
});

const globalStore = useGlobalStore();
const changeCollapse = () => {
  globalStore.setGlobalState("isCollapse", !globalStore.isCollapse);
  state.collapsed = !state.collapsed;
};
</script>

<style scoped lang="scss">
.collapse-icon {
  margin-right: 20px;
  font-size: 22px;
  color: var(--a-header-text-color);
  cursor: pointer;
}
</style>
