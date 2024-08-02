<template>
  <div class="fullscreen">
    <a-button type="text" @click="handleFullScreen" class="full-screen-svg">
      <SvgIcon name="FullScreen" style="width: 17px; height: 22px" />
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { message } from "ant-design-vue";
import screenfull from "screenfull";
import SvgIcon from "@/components/SvgIcon/index.vue";

const isFullscreen = ref(screenfull.isFullscreen);

onMounted(() => {
  screenfull.on("change", () => {
    if (screenfull.isFullscreen) isFullscreen.value = true;
    else isFullscreen.value = false;
  });
});

const handleFullScreen = () => {
  if (!screenfull.isEnabled) message.warning("当前您的浏览器不支持全屏 ❌");
  screenfull.toggle();
};
</script>

<style scoped lang="scss">
.fullscreen {
  .full-screen-svg {
    margin-top: 22px;
  }
}
</style>
