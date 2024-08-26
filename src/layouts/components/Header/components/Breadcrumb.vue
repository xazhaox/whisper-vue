<template>
  <div :class="['breadcrumb-box mask-image', !globalStore.breadcrumbIcon && 'no-icon']">
    <a-breadcrumb :separator-icon="RightOutlined">
      <transition-group name="breadcrumb">
        <a-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
          <div
            class="el-breadcrumb__inner is-link"
            :class="{ 'item-no-icon': !item.meta.icon }"
            @click="onBreadcrumbClick(item, index)"
          >
            <!-- <icon v-if="item.meta.icon && globalStore.breadcrumbIcon" class="breadcrumb-icon">
              <component :is="item.meta.icon"></component>
            </icon> -->
            <span class="breadcrumb-title">{{ item.meta.title }}</span>
          </div>
        </a-breadcrumb-item>
      </transition-group>
    </a-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { HOME_URL } from "@/config";
import { useRoute, useRouter } from "vue-router";
import { RightOutlined /* , HomeOutlined */ } from "@ant-design/icons-vue";
import { useAuthStore } from "@/stores/modules/auth";
import { useGlobalStore } from "@/stores/modules/global";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

const breadcrumbList = computed(() => {
  let breadcrumbData = authStore.breadcrumbListGet[route.matched[route.matched.length - 1].path] ?? [];
  // 🙅‍♀️不需要首页面包屑可删除以下判断
  if (breadcrumbData[0].path !== HOME_URL) {
    breadcrumbData = [{ path: HOME_URL, meta: { icon: "HomeOutlined", title: "首页" } }, ...breadcrumbData];
  }
  return breadcrumbData;
});

// Click Breadcrumb
const onBreadcrumbClick = (item: Menu.MenuOptions, index: number) => {
  if (index !== breadcrumbList.value.length - 1) router.push(item.path);
};
</script>

<style scoped lang="scss">
.breadcrumb-box {
  display: flex;
  align-items: center;
  overflow: hidden;
  .ant-breadcrumb {
    white-space: nowrap;
    .ant-breadcrumb__item {
      position: relative;
      display: inline-block;
      float: none;
      .item-no-icon {
        transform: translateY(-3px);
      }
      .ant-breadcrumb__inner {
        display: inline-flex;
        &.is-link {
          color: var(--el-header-text-color);
          &:hover {
            color: var(--el-color-primary);
          }
        }
        .breadcrumb-icon {
          margin-top: 1px;
          margin-right: 6px;
          font-size: 16px;
        }
        .breadcrumb-title {
          margin-top: 2px;
        }
      }
      &:last-child .ant-breadcrumb__inner,
      &:last-child .ant-breadcrumb__inner:hover {
        color: var(--el-header-text-color-regular);
      }
      :deep(.ant-breadcrumb__separator) {
        transform: translateY(-1px);
      }
    }
  }
}
.no-icon {
  .ant-breadcrumb {
    .ant-breadcrumb__item {
      top: -2px;
      :deep(.ant-breadcrumb__separator) {
        top: 4px;
      }
      .item-no-icon {
        transform: translateY(0);
      }
    }
  }
}
</style>
