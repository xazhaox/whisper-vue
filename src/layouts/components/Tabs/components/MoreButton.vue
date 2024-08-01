<template>
  <div class="custom-ant-dropdown">
    <a-dropdown trigger="click" :teleported="false">
      <div class="more-button">
        <HolderOutlined />
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item @click="refresh"> <SyncOutlined /> {{ $t("tabs.refresh") }} </a-menu-item>
          <a-menu-item @click="maximize"> <FullscreenOutlined /> {{ $t("tabs.maximize") }} </a-menu-item>
          <a-menu-divider />
          <a-menu-item divided @click="closeCurrentTab"> <MinusCircleOutlined /> {{ $t("tabs.closeCurrent") }} </a-menu-item>
          <a-menu-item @click="tabStore.closeTabsOnSide(route.fullPath, 'left')">
            <DoubleLeftOutlined /> {{ $t("tabs.closeLeft") }}
          </a-menu-item>
          <a-menu-item @click="tabStore.closeTabsOnSide(route.fullPath, 'right')">
            <DoubleRightOutlined /> {{ $t("tabs.closeRight") }}
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item divided @click="tabStore.closeMultipleTab(route.fullPath)">
            <CloseCircleOutlined /> {{ $t("tabs.closeOther") }}
          </a-menu-item>
          <a-menu-item @click="closeAllTab"><CloseOutlined /> {{ $t("tabs.closeAll") }} </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { inject, nextTick } from "vue";
import { HOME_URL } from "@/config";
import { useTabsStore } from "@/stores/modules/tabs";
import { useGlobalStore } from "@/stores/modules/global";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { useRoute, useRouter } from "vue-router";
import {
  HolderOutlined,
  SyncOutlined,
  FullscreenOutlined,
  MinusCircleOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  CloseCircleOutlined,
  CloseOutlined
} from "@ant-design/icons-vue";

const route = useRoute();
const router = useRouter();
const tabStore = useTabsStore();
const globalStore = useGlobalStore();
const keepAliveStore = useKeepAliveStore();

// refresh current page
const refreshCurrentPage: Function = inject("refresh") as Function;
const refresh = () => {
  setTimeout(() => {
    route.meta.isKeepAlive && keepAliveStore.removeKeepAliveName(route.fullPath as string);
    refreshCurrentPage(false);
    nextTick(() => {
      route.meta.isKeepAlive && keepAliveStore.addKeepAliveName(route.fullPath as string);
      refreshCurrentPage(true);
    });
  }, 0);
};

// maximize current page
const maximize = () => {
  globalStore.setGlobalState("maximize", true);
};

// Close Current
const closeCurrentTab = () => {
  if (route.meta.isAffix) return;
  tabStore.removeTabs(route.fullPath);
};

// Close All
const closeAllTab = () => {
  tabStore.closeMultipleTab();
  router.push(HOME_URL);
};
</script>

<style scoped lang="scss">
@import "../index";
</style>
