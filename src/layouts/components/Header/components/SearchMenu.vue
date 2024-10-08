<template>
  <div class="search-menu">
    <a-button type="text" @click="handleOpen" class="search-svg">
      <SvgIcon name="search" style="width: 17px; height: 22px" />
    </a-button>
    <a-modal class="search-dialog" v-model="isShowSearch" :width="600" :show-close="false" top="10vh">
      <a-input
        v-model="searchMenu"
        ref="menuInputRef"
        placeholder="菜单搜索：支持菜单名称、路径"
        size="large"
        clearable
        :prefix-icon="SearchOutlined"
      ></a-input>
      <div v-if="searchList.length" class="menu-list" ref="menuListRef">
        <div
          v-for="item in searchList"
          :key="item.path"
          :class="['menu-item', { 'menu-active': item.path === activePath }]"
          @mouseenter="mouseoverMenuItem(item)"
          @click="handleClickMenu()"
        >
          <div class="menu-lf">
            <!-- <icon class="menu-icon">
              <component :is="item.meta.icon"></component>
            </icon> -->
            <span class="menu-title">{{ item.meta.title }}</span>
          </div>
          <i :class="'iconfont icon-huiche'" class="menu-enter" @click="handleOpen"></i>
        </div>
      </div>
      <a-empty v-else class="mt20 mb20" :image-size="100" description="暂无菜单" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from "vue";
import { /* InputInstance */ message } from "ant-design-vue";
import { SearchOutlined } from "@ant-design/icons-vue";
import { useAuthStore } from "@/stores/modules/auth";
import { useRouter } from "vue-router";
import { useDebounceFn } from "@vueuse/core";
import SvgIcon from "@/components/SvgIcon/index.vue";

const router = useRouter();
const authStore = useAuthStore();
const menuList = computed(() => authStore.flatMenuListGet.filter(item => !item.meta.isHide));

onMounted(() => {
  document.addEventListener("keydown", keyboardOperation);
});

onUnmounted(() => {
  document.removeEventListener("keydown", keyboardOperation);
});

const activePath = ref("");
const mouseoverMenuItem = (menu: Menu.MenuOptions) => {
  activePath.value = menu.path;
};

/* const menuInputRef = ref<InputInstance | null>(null); */
const menuInputRef = ref(null);
const isShowSearch = ref<boolean>(false);
const searchMenu = ref<string>("");
const handleOpen = () => {
  /* isShowSearch.value = true;
  nextTick(() => {
    setTimeout(() => {
      menuInputRef.value?.focus();
    });
  }); */
  message.success("点击了！");
};

const searchList = ref<Menu.MenuOptions[]>([]);
const updateSearchList = () => {
  searchList.value = searchMenu.value
    ? menuList.value.filter(
        item =>
          (item.path.toLowerCase().includes(searchMenu.value.toLowerCase()) ||
            item.meta.title.toLowerCase().includes(searchMenu.value.toLowerCase())) &&
          !item.meta?.isHide
      )
    : [];
  activePath.value = searchList.value.length ? searchList.value[0].path : "";
};

const debouncedUpdateSearchList = useDebounceFn(updateSearchList, 300);

watch(searchMenu, debouncedUpdateSearchList);

const menuListRef = ref<Element | null>(null);
const keyPressUpOrDown = (direction: number) => {
  const length = searchList.value.length;
  if (length === 0) return;
  const index = searchList.value.findIndex(item => item.path === activePath.value);
  const newIndex = (index + direction + length) % length;
  activePath.value = searchList.value[newIndex].path;
  nextTick(() => {
    if (!menuListRef.value?.firstElementChild) return;
    const menuItemHeight = menuListRef.value.firstElementChild.clientHeight + 12 || 0;
    menuListRef.value.scrollTop = newIndex * menuItemHeight;
  });
};

const keyboardOperation = (event: KeyboardEvent) => {
  if (event.key === "ArrowUp") {
    event.preventDefault();
    keyPressUpOrDown(-1);
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    keyPressUpOrDown(1);
  } else if (event.key === "Enter") {
    event.preventDefault();
    handleClickMenu();
  }
};

const handleClickMenu = () => {
  const menu = searchList.value.find(item => item.path === activePath.value);
  if (!menu) return;
  if (menu.meta?.isLink) window.open(menu.meta.isLink, "_blank");
  else router.push(menu.path);
  searchMenu.value = "";
  isShowSearch.value = false;
};
</script>

<style scoped lang="scss">
.search-menu {
  .search-svg {
    margin-top: 22px;
  }
  :deep(.ant-dialog) {
    border-radius: 4px;
    .ant-dialog__header {
      display: none;
    }
  }
  .menu-list {
    max-height: 515px;
    margin-top: 15px;
    overflow: auto;
    .menu-item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 45px;
      padding: 0 20px;
      margin: 10px 0;
      color: var(--a-text-color-secondary);
      cursor: pointer;
      background-color: transparent;
      border: 1px solid var(--a-border-color);
      border-radius: 6px;
      transition: all 0.2s ease;
      .menu-lf {
        display: flex;
        align-items: center;
      }
      .menu-icon {
        margin-right: 8px;
        font-size: 16px;
      }
      .menu-title {
        font-size: 14px;
      }
      .menu-enter {
        font-size: 17px;
      }
    }
    .menu-active {
      color: #ffffff;
      background-color: var(--a-color-primary);
      .menu-icon {
        font-size: 18px;
      }
      .menu-title {
        font-size: 16px;
      }
      .menu-enter {
        font-size: 19px;
      }
    }
  }
}
</style>
