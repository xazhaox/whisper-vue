import { createApp } from "vue";
import App from "./App.vue";

// reset style sheet
import "@/styles/reset.scss";
// CSS common style sheet
import "@/styles/common.scss";
// iconfont css
import "@/assets/iconfont/iconfont.scss";
// font css
import "@/assets/fonts/font.scss";
// ant-design-vue css
import "ant-design-vue/dist/reset.css";
// custom element dark css
import "@/styles/element-dark.scss";
// custom element css
import "@/styles/element.scss";
// svg icons
import "virtual:svg-icons-register";

// ant-design-vue
import Antd from "ant-design-vue";

// custom directives
import directives from "@/directives/index";
// vue Router
import router from "@/routers";
// vue i18n
import I18n from "@/locales/index";
// pinia store
import pinia from "@/stores";
// errorHandler
import errorHandler from "@/utils/errorHandler";

const app = createApp(App);

app.config.errorHandler = errorHandler;

app.use(Antd).use(directives).use(router).use(I18n).use(pinia).mount("#app");
