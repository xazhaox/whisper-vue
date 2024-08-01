<!-- 标签 -->
<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <a-tabs v-model:tabsMenuValue="tabsMenuValue" hide-add type="editable-card">
        <a-tab-pane v-for="item in tabsMenuList" :key="item.path" :tab="item.title" :name="item.path" :closable="item.close">
          <template #tab>
            <apple-outlined />
            {{ item.title }}
          </template>
        </a-tab-pane>
      </a-tabs>
      <MoreButton />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sortable from "sortablejs";
import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useTabsStore } from "@/stores/modules/tabs";
import { useAuthStore } from "@/stores/modules/auth";
import { AppleOutlined } from "@ant-design/icons-vue";
import MoreButton from "./components/MoreButton.vue";

const route = useRoute();
const tabStore = useTabsStore();
const authStore = useAuthStore();

const tabsMenuValue = ref(route.fullPath);
const tabsMenuList = computed(() => tabStore.tabsMenuList);

onMounted(() => {
  tabsDrop();
  initTabs();
});

// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
  () => route.fullPath,
  () => {
    if (route.meta.isFull) return;
    tabsMenuValue.value = route.fullPath;
    const tabsParams = {
      icon: route.meta.icon as string,
      title: route.meta.title as string,
      path: route.fullPath,
      name: route.name as string,
      close: !route.meta.isAffix,
      isKeepAlive: route.meta.isKeepAlive as boolean
    };
    tabStore.addTabs(tabsParams);
  },
  { immediate: true }
);

// 初始化需要固定的 tabs
const initTabs = () => {
  authStore.flatMenuListGet.forEach(item => {
    if (item.meta.isAffix && !item.meta.isHide && !item.meta.isFull) {
      const tabsParams = {
        icon: item.meta.icon,
        title: item.meta.title,
        path: item.path,
        name: item.name,
        close: !item.meta.isAffix,
        isKeepAlive: item.meta.isKeepAlive
      };
      tabStore.addTabs(tabsParams);
    }
  });
};

// tabs 拖拽排序
const tabsDrop = () => {
  Sortable.create(document.querySelector(".a-tabs__nav") as HTMLElement, {
    draggable: ".a-tabs__item",
    animation: 300,
    onEnd({ newIndex, oldIndex }) {
      const tabsList = [...tabStore.tabsMenuList];
      const currRow = tabsList.splice(oldIndex as number, 1)[0];
      tabsList.splice(newIndex as number, 0, currRow);
      tabStore.setTabs(tabsList);
    }
  });
};

// Tab Click

// Remove Tab
</script>

<style scoped lang="scss">
@import "./index";
</style>
