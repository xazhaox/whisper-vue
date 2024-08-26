<!-- 菜单 -->
<template>
  <div>
    <SimpleScrollbar class="menu-wrapper">
      <a-menu
        :inline-collapsed="inlineCollapsed"
        :inline-indent="inlineIndent"
        :multiple="multiple"
        :mode="state.menuMode"
        v-model:openKeys="state.openKeys"
        v-model:selectedKeys="state.selectedKeys"
        @click="handleClickMenu"
      >
        <template v-for="subItem in menuList" :key="subItem.path">
          <!-- subItem的children存在，且children是非空数组时，才会渲染该组件 -->
          <a-sub-menu v-if="subItem.children?.length" :key="subItem.path">
            <template #title>
              <span class="sle">{{ subItem.meta.title }}</span>
            </template>
            <SubMenu :menu-list="subItem.children" />
          </a-sub-menu>
          <!-- 渲染菜单项 -->
          <a-menu-item v-else :key="subItem.path" :menu="subItem">
            <span class="sle">{{ subItem.meta.title }}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </SimpleScrollbar>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import type { MenuMode, MenuProps } from "ant-design-vue";
import { SimpleScrollbar } from "@/layouts/components/SimpleScrollbar";

interface stateItem {
  menuMode: MenuMode;
  rootSubmenuKeys: string[];
  openKeys: string[];
  selectedKeys: string[];
}

const state: stateItem = reactive({
  menuMode: "inline" as MenuMode,
  rootSubmenuKeys: [],
  openKeys: [],
  selectedKeys: []
});
const multiple = ref<boolean>(false);
const inlineIndent = ref<number>(24);
const inlineCollapsed = ref<boolean>(true);

defineProps<{ menuList: Menu.MenuOptions[] }>();

const router = useRouter();
const handleClickMenu: MenuProps["onClick"] = menuInfo => {
  const subItem = menuInfo.item.menu;
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, "_blank");
  router.push(subItem.path);
};
</script>

<style scoped lang="scss">
.menu-wrapper {
  :deep(.ant-menu-inline) {
    .ant-menu-item {
      width: calc(100% - 16px);
      margin-inline: 8px;
    }
  }
  :deep(.ant-menu-submenu-title) {
    width: calc(100% - 16px);
    margin-inline: 8px;
  }
  :deep(.ant-menu-inline-collapsed) {
    > .ant-menu-item {
      padding-inline: calc(50% - 14px);
    }
    .ant-menu-item-icon {
      vertical-align: -0.25em;
    }
    .ant-menu-submenu-title {
      padding-inline: calc(50% - 18px);
    }
  }
  :deep(.ant-menu-horizontal) {
    .ant-menu-item {
      display: flex;
      align-items: center;
    }
    .ant-menu-submenu-title {
      display: flex;
      align-items: center;
    }
  }
}
</style>
