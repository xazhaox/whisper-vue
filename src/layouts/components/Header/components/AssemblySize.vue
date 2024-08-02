<template>
  <a-dropdown trigger="click" @command="setAssemblySize">
    <div class="layout-assembly">
      <a-button type="text" class="layout-svg">
        <SvgIcon name="layout" style="width: 22px; height: 23px" />
      </a-button>
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item
          v-for="item in assemblySizeList"
          :key="item.value"
          :command="item.value"
          :disabled="assemblySize === item.value"
        >
          {{ item.label }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useGlobalStore } from "@/stores/modules/global";
import { AssemblySizeType } from "@/stores/interface";
import SvgIcon from "@/components/SvgIcon/index.vue";

const globalStore = useGlobalStore();
const assemblySize = computed(() => globalStore.assemblySize);

const assemblySizeList = [
  { label: "默认", value: "default" },
  { label: "大型", value: "large" },
  { label: "小型", value: "small" }
];

const setAssemblySize = (item: AssemblySizeType) => {
  if (assemblySize.value === item) return;
  globalStore.setGlobalState("assemblySize", item);
};
</script>

<style lang="scss">
.layout-assembly {
  .layout-svg {
    margin-top: 22px;
  }
}
</style>
