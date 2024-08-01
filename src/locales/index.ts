import { createI18n } from "vue-i18n";
import { getBrowserLang } from "@/utils";

import zh from "./langs/zh-cn";
import en from "./langs/en-us";

const i18n = createI18n({
  // Use Composition API, Set to false
  allowComposition: true,
  legacy: false,
  locale: getBrowserLang(),
  messages: {
    zh,
    en
  }
});

export default i18n;
