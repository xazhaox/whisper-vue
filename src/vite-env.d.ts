// <reference types="vite/client" />
declare module "vue-router";
declare module "js-cookie";
declare module "axios";
declare module "pinia";
declare module "qs";
declare module "ant-design-vue";
declare module "jsencrypt/bin/jsencrypt.min";
declare module "pinia-plugin-persistedstate";
declare module "*.vue" {
  import { ComponentOptions } from "vue";
  const componentOptions: ComponentOptions;
  export default componentOptions;
}
