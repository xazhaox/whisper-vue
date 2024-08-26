<!-- 纵向布局 -->
<template>
  <a-layout>
    <!-- 左侧 -->
    <a-layout-sider v-model:collapsed="collapsed" collapsible :trigger="null">
      <div class="aside-box">
        <!-- logo -->
        <div class="logo flx-center">
          <img class="logo-img" src="@/assets/logo/logo.svg" alt="logo" />
          <span v-show="!isCollapse" class="logo-text">{{ whisperTitle }}</span>
        </div>
        <!-- 菜单 -->
        <a-menu
          :router="false"
          :default-active="activeMenu"
          :collapse="isCollapse"
          :unique-opened="accordion"
          :collapse-transition="false"
        >
          <SubMenu :menu-list="menuList" />
        </a-menu>
      </div>
    </a-layout-sider>
    <a-layout>
      <!-- 头部 -->
      <a-layout-header>
        <ToolBarLeft />
        <ToolBarRight />
      </a-layout-header>
      <!-- 标签、主体、底部 -->
      <Main />
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts" name="layoutVertical">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/modules/auth";
import { useGlobalStore } from "@/stores/modules/global";
import Main from "@/layouts/components/Main/index.vue";
import ToolBarLeft from "@/layouts/components/Header/ToolBarLeft.vue";
import ToolBarRight from "@/layouts/components/Header/ToolBarRight.vue";
import SubMenu from "@/layouts/components/Menu/SubMenu.vue";

const title = import.meta.env.VITE_GLOB_APP_TITLE;
const whisperTitle = title.substring(0, 7);

const collapsed = ref<boolean>(false);

const route = useRoute();
const authStore = useAuthStore();
const globalStore = useGlobalStore();
const accordion = computed(() => globalStore.accordion);
const isCollapse = computed(() => globalStore.isCollapse);
const menuList = computed(() => authStore.showMenuListGet);
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string);

console.log("1.", menuList);
</script>

<style scoped lang="scss">
@import "./index";
</style>
