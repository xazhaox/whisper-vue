<template>
  <div class="theme-setting">
    <a-button type="text" @click="openDrawer" class="theme-color-svg">
      <SvgIcon name="ThemeColor" style="width: 19px; height: 22px" />
    </a-button>
  </div>
</template>

<script setup lang="ts">
import mittBus from "@/utils/mittBus";
import SvgIcon from "@/components/SvgIcon/index.vue";

const openDrawer = () => {
  mittBus.emit("openThemeDrawer");
};
</script>

<style scoped lang="scss">
.theme-setting {
  .theme-color-svg {
    margin-top: 22px;
  }
}
</style>
