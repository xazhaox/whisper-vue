<template>
  <a-dropdown trigger="click" @command="changeLanguage">
    <div class="laanguge-toggle">
      <a-button type="text" class="language-svg">
        <SvgIcon name="Language" style="width: 20px; height: 24px" />
      </a-button>
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item v-for="item in languageList" :key="item.value" :command="item.value" :disabled="language === item.value">
          {{ item.label }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { useGlobalStore } from "@/stores/modules/global";
import { LanguageType } from "@/stores/interface";
import SvgIcon from "@/components/SvgIcon/index.vue";

const i18n = useI18n();
const globalStore = useGlobalStore();
const language = computed(() => globalStore.language);

const languageList = [
  { label: "简体中文", value: "zh" },
  { label: "English", value: "en" }
];

const changeLanguage = (lang: string) => {
  i18n.locale.value = lang;
  globalStore.setGlobalState("language", lang as LanguageType);
};
</script>

<style scoped lang="scss">
.laanguge-toggle {
  .language-svg {
    margin-top: 23px;
  }
}
</style>
