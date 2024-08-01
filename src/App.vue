<template>
  <a-config-provider :locale="locale" :size="assemblySize" :button="buttonConfig">
    <router-view></router-view>
  </a-config-provider>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed } from "vue";
import { useI18n } from "vue-i18n";
import { getBrowserLang } from "@/utils";
import { useTheme } from "@/hooks/useTheme";
import { LanguageType } from "./stores/interface";
import { useGlobalStore } from "@/stores/modules/global";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import enUS from "ant-design-vue/es/locale/en_US";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

const globalStore = useGlobalStore();

// init theme
const { initTheme } = useTheme();
initTheme();

// init language
const i18n = useI18n();
onMounted(() => {
  const language = globalStore.language ?? getBrowserLang();
  i18n.locale.value = language;
  globalStore.setGlobalState("language", language as LanguageType);
});

// element language
const locale = computed(() => {
  if (globalStore.language == "zh") return zhCN;
  if (globalStore.language == "en") return enUS;
  return getBrowserLang() == "zh" ? zhCN : enUS;
});

// element assemblySize
const assemblySize = computed(() => globalStore.assemblySize);

// element button config
const buttonConfig = reactive({ autoInsertSpace: false });
</script>
