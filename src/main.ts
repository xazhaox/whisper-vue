import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// ant-design-vue
import Antd from "ant-design-vue";
// ant-design-vue css
import "ant-design-vue/dist/reset.css";

const app = createApp(App);

app.use(Antd).mount("#app");
