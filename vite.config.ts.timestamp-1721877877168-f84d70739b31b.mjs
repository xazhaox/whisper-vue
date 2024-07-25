// vite.config.ts
import { defineConfig, loadEnv } from "file:///E:/workspace/release/whisper-vue/node_modules/.pnpm/vite@5.3.4_@types+node@20.14.12_sass@1.77.8/node_modules/vite/dist/node/index.js";
import { resolve as resolve2 } from "path";

// build/getEnv.ts
function wrapperEnv(envConf) {
  const ret = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT") realName = Number(realName);
    if (envName === "VITE_PROXY") {
      try {
        realName = JSON.parse(realName);
      } catch (error) {
      }
    }
    ret[envName] = realName;
  }
  return ret;
}

// build/proxy.ts
function createProxy(list = []) {
  const ret = {};
  for (const [prefix, target] of list) {
    const httpsRE = /^https:\/\//;
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ""),
      // https is require secure=false
      ...isHttps ? { secure: false } : {}
    };
  }
  return ret;
}

// build/plugins.ts
import { resolve } from "path";
import { VitePWA } from "file:///E:/workspace/release/whisper-vue/node_modules/.pnpm/vite-plugin-pwa@0.20.0_vite@5.3.4_workbox-build@7.1.1_workbox-window@7.1.0/node_modules/vite-plugin-pwa/dist/index.js";
import { visualizer } from "file:///E:/workspace/release/whisper-vue/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0_rollup@2.79.1/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { createHtmlPlugin } from "file:///E:/workspace/release/whisper-vue/node_modules/.pnpm/vite-plugin-html@3.2.2_vite@5.3.4/node_modules/vite-plugin-html/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///E:/workspace/release/whisper-vue/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.3.4/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import vue from "file:///E:/workspace/release/whisper-vue/node_modules/.pnpm/@vitejs+plugin-vue@5.0.5_vite@5.3.4_vue@3.4.33/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///E:/workspace/release/whisper-vue/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.0.0_vite@5.3.4_vue@3.4.33/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import eslintPlugin from "file:///E:/workspace/release/whisper-vue/node_modules/.pnpm/vite-plugin-eslint@1.8.1_eslint@8.56.0_vite@5.3.4/node_modules/vite-plugin-eslint/dist/index.mjs";
import viteCompression from "file:///E:/workspace/release/whisper-vue/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.3.4/node_modules/vite-plugin-compression/dist/index.mjs";
import vueSetupExtend from "file:///E:/workspace/release/whisper-vue/node_modules/.pnpm/unplugin-vue-setup-extend-plus@1.0.1/node_modules/unplugin-vue-setup-extend-plus/dist/vite.js";
var createVitePlugins = (viteEnv) => {
  const { VITE_GLOB_APP_TITLE, VITE_REPORT, VITE_PWA } = viteEnv;
  return [
    vue(),
    // vue 可以使用 jsx/tsx 语法
    vueJsx(),
    // esLint 报错信息显示在浏览器界面上
    eslintPlugin(),
    // name 可以写在 script 标签上
    vueSetupExtend({}),
    // 创建打包压缩配置
    createCompression(viteEnv),
    // 注入变量到 html 文件
    createHtmlPlugin({
      inject: {
        data: { title: VITE_GLOB_APP_TITLE }
      }
    }),
    // 使用 svg 图标
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]"
    }),
    // vitePWA
    VITE_PWA && createVitePwa(viteEnv),
    // 是否生成包预览，分析依赖包大小做优化处理
    VITE_REPORT && visualizer({ filename: "stats.html", gzipSize: true, brotliSize: true })
  ];
};
var createCompression = (viteEnv) => {
  const { VITE_BUILD_COMPRESS = "none", VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;
  const compressList = VITE_BUILD_COMPRESS.split(",");
  const plugins = [];
  if (compressList.includes("gzip")) {
    plugins.push(
      viteCompression({
        ext: ".gz",
        algorithm: "gzip",
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      })
    );
  }
  if (compressList.includes("brotli")) {
    plugins.push(
      viteCompression({
        ext: ".br",
        algorithm: "brotliCompress",
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      })
    );
  }
  return plugins;
};
var createVitePwa = (viteEnv) => {
  const { VITE_GLOB_APP_TITLE } = viteEnv;
  return VitePWA({
    registerType: "autoUpdate",
    manifest: {
      name: VITE_GLOB_APP_TITLE,
      short_name: VITE_GLOB_APP_TITLE,
      theme_color: "#ffffff",
      icons: [
        {
          src: "/logo.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/logo.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "/logo.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable"
        }
      ]
    }
  });
};

// package.json
var package_default = {
  name: "whisper-vue",
  private: true,
  version: "1.0.1",
  type: "module",
  author: {
    name: "xazhao",
    email: "xazhao@126.com",
    url: "https://github.com/xazhaox"
  },
  license: "MIT",
  homepage: "https://github.com/xazhaox/whisper-vue",
  repository: {
    type: "git",
    url: "git@github.com:xazhaox/whisper-vue.git"
  },
  bugs: {
    url: "https://github.com/xazhaox/whisper-vue/issues"
  },
  scripts: {
    dev: "vite",
    serve: "vite",
    "build:dev": "vue-tsc && vite build --mode dev",
    "build:uat": "vue-tsc && vite build --mode uat",
    "build:prod": "vue-tsc && vite build --mode prod",
    "type:check": "vue-tsc --noEmit --skipLibCheck",
    preview: "npm run build:dev && vite preview",
    "lint:eslint": "eslint --fix --ext .js,.ts,.vue ./src",
    "lint:prettier": 'prettier --write "src/**/*.{js,ts,json,tsx,css,less,scss,vue,html,md}" "*.ts"',
    "lint:stylelint": 'stylelint --cache --fix "**/*.{vue,less,postcss,css,scss}" --cache --cache-location node_modules/.cache/stylelint/',
    "lint:lint-staged": "lint-staged",
    prepare: "husky install",
    release: "standard-version",
    commit: "git add -A && czg && git push"
  },
  dependencies: {
    "@ant-design/icons-vue": "^7.0.1",
    "@antv/g6": "^5.0.10",
    "@better-scroll/core": "^2.5.1",
    "@vueuse/core": "^10.11.0",
    "@wangeditor/editor": "^5.1.23",
    "@wangeditor/editor-for-vue": "^1.0.2",
    "ant-design-vue": "^4.2.3",
    axios: "^1.7.2",
    "crypto-js": "^4.2.0",
    dayjs: "^1.11.12",
    "driver.js": "^1.3.1",
    echarts: "^5.5.1",
    "echarts-liquidfill": "^3.1.0",
    global: "^4.4.0",
    html2canvas: "^1.4.1",
    "js-md5": "^0.8.3",
    mitt: "^3.0.1",
    nprogress: "^0.2.0",
    pinia: "^2.1.7",
    "pinia-plugin-persistedstate": "^3.2.1",
    "print-js": "^1.6.0",
    qs: "^6.12.3",
    sortablejs: "^1.15.2",
    vue: "^3.4.33",
    "vue-i18n": "^9.13.1",
    "vue-router": "^4.4.0",
    vuedraggable: "^2.24.3",
    yarn: "^1.22.22"
  },
  devDependencies: {
    "@commitlint/cli": "^19.3.0",
    "@commitlint/config-conventional": "^19.2.2",
    "@types/js-md5": "^0.7.2",
    "@types/nprogress": "^0.2.3",
    "@types/qs": "^6.9.15",
    "@types/sortablejs": "^1.15.8",
    "@typescript-eslint/eslint-plugin": "^7.17.0",
    "@typescript-eslint/parser": "^7.17.0",
    "@vitejs/plugin-vue": "^5.0.5",
    "@vitejs/plugin-vue-jsx": "^4.0.0",
    autoprefixer: "^10.4.19",
    "cz-git": "^1.9.4",
    czg: "^1.9.4",
    eslint: "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.2.1",
    "eslint-plugin-vue": "^9.27.0",
    husky: "^9.1.1",
    "lint-staged": "^15.2.7",
    postcss: "^8.4.39",
    "postcss-html": "^1.7.0",
    prettier: "^3.3.3",
    "rollup-plugin-visualizer": "^5.12.0",
    sass: "^1.77.8",
    "standard-version": "^9.5.0",
    stylelint: "^16.7.0",
    "stylelint-config-html": "^1.1.0",
    "stylelint-config-recess-order": "^5.0.1",
    "stylelint-config-recommended-scss": "^14.1.0",
    "stylelint-config-recommended-vue": "^1.5.0",
    "stylelint-config-standard": "^36.0.1",
    "stylelint-config-standard-scss": "^13.1.0",
    typescript: "^5.5.4",
    "unplugin-icons": "^0.19.0",
    "unplugin-vue-setup-extend-plus": "^1.0.1",
    vite: "^5.3.4",
    "vite-plugin-compression": "^0.5.1",
    "vite-plugin-eslint": "^1.8.1",
    "vite-plugin-html": "^3.2.2",
    "vite-plugin-pwa": "^0.20.0",
    "vite-plugin-svg-icons": "^2.0.1",
    "vue-tsc": "^2.0.24"
  },
  engines: {
    node: ">=16.0.0"
  },
  browserslist: {
    production: [
      "> 1%",
      "not dead",
      "not op_mini all"
    ],
    development: [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  config: {
    commitizen: {
      path: "node_modules/cz-git"
    }
  }
};

// vite.config.ts
import dayjs from "file:///E:/workspace/release/whisper-vue/node_modules/.pnpm/dayjs@1.11.12/node_modules/dayjs/dayjs.min.js";
var __vite_injected_original_dirname = "E:\\workspace\\release\\whisper-vue";
var { dependencies, devDependencies, name, version } = package_default;
var __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};
var vite_config_default = defineConfig(({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        "@": resolve2(__vite_injected_original_dirname, "./src"),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
      }
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/var.scss";`
        }
      }
    },
    server: {
      host: "0.0.0.0",
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      // Load proxy configuration from .env.development
      proxy: createProxy(viteEnv.VITE_PROXY)
    },
    plugins: [createVitePlugins(viteEnv)],
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    },
    build: {
      outDir: "dist",
      minify: "esbuild",
      // esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
      // minify: "terser",
      // terserOptions: {
      // 	compress: {
      // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
      // 		drop_debugger: true
      // 	}
      // },
      sourcemap: false,
      // 禁用 gzip 压缩大小报告，可略微减少打包时间
      reportCompressedSize: false,
      // 规定触发警告的 chunk 大小
      chunkSizeWarningLimit: 2e3,
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvZ2V0RW52LnRzIiwgImJ1aWxkL3Byb3h5LnRzIiwgImJ1aWxkL3BsdWdpbnMudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcd29ya3NwYWNlXFxcXHJlbGVhc2VcXFxcd2hpc3Blci12dWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXHdvcmtzcGFjZVxcXFxyZWxlYXNlXFxcXHdoaXNwZXItdnVlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi93b3Jrc3BhY2UvcmVsZWFzZS93aGlzcGVyLXZ1ZS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiwgQ29uZmlnRW52LCBVc2VyQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgd3JhcHBlckVudiB9IGZyb20gXCIuL2J1aWxkL2dldEVudlwiO1xuaW1wb3J0IHsgY3JlYXRlUHJveHkgfSBmcm9tIFwiLi9idWlsZC9wcm94eVwiO1xuaW1wb3J0IHsgY3JlYXRlVml0ZVBsdWdpbnMgfSBmcm9tIFwiLi9idWlsZC9wbHVnaW5zXCI7XG5pbXBvcnQgcGtnIGZyb20gXCIuL3BhY2thZ2UuanNvblwiO1xuaW1wb3J0IGRheWpzIGZyb20gXCJkYXlqc1wiO1xuXG5jb25zdCB7IGRlcGVuZGVuY2llcywgZGV2RGVwZW5kZW5jaWVzLCBuYW1lLCB2ZXJzaW9uIH0gPSBwa2c7XG5jb25zdCBfX0FQUF9JTkZPX18gPSB7XG4gIHBrZzogeyBkZXBlbmRlbmNpZXMsIGRldkRlcGVuZGVuY2llcywgbmFtZSwgdmVyc2lvbiB9LFxuICBsYXN0QnVpbGRUaW1lOiBkYXlqcygpLmZvcm1hdChcIllZWVktTU0tREQgSEg6bW06c3NcIilcbn07XG5cbi8vIEBzZWU6IGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9OiBDb25maWdFbnYpOiBVc2VyQ29uZmlnID0+IHtcbiAgY29uc3Qgcm9vdCA9IHByb2Nlc3MuY3dkKCk7XG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcm9vdCk7XG4gIGNvbnN0IHZpdGVFbnYgPSB3cmFwcGVyRW52KGVudik7XG5cbiAgcmV0dXJuIHtcbiAgICBiYXNlOiB2aXRlRW52LlZJVEVfUFVCTElDX1BBVEgsXG4gICAgcm9vdCxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICBcIkBcIjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgICAgIFwidnVlLWkxOG5cIjogXCJ2dWUtaTE4bi9kaXN0L3Z1ZS1pMThuLmNqcy5qc1wiXG4gICAgICB9XG4gICAgfSxcbiAgICBkZWZpbmU6IHtcbiAgICAgIF9fQVBQX0lORk9fXzogSlNPTi5zdHJpbmdpZnkoX19BUFBfSU5GT19fKVxuICAgIH0sXG4gICAgY3NzOiB7XG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCJAL3N0eWxlcy92YXIuc2Nzc1wiO2BcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBob3N0OiBcIjAuMC4wLjBcIixcbiAgICAgIHBvcnQ6IHZpdGVFbnYuVklURV9QT1JULFxuICAgICAgb3Blbjogdml0ZUVudi5WSVRFX09QRU4sXG4gICAgICBjb3JzOiB0cnVlLFxuICAgICAgLy8gTG9hZCBwcm94eSBjb25maWd1cmF0aW9uIGZyb20gLmVudi5kZXZlbG9wbWVudFxuICAgICAgcHJveHk6IGNyZWF0ZVByb3h5KHZpdGVFbnYuVklURV9QUk9YWSlcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtjcmVhdGVWaXRlUGx1Z2lucyh2aXRlRW52KV0sXG4gICAgZXNidWlsZDoge1xuICAgICAgcHVyZTogdml0ZUVudi5WSVRFX0RST1BfQ09OU09MRSA/IFtcImNvbnNvbGUubG9nXCIsIFwiZGVidWdnZXJcIl0gOiBbXVxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIG91dERpcjogXCJkaXN0XCIsXG4gICAgICBtaW5pZnk6IFwiZXNidWlsZFwiLFxuICAgICAgLy8gZXNidWlsZCBcdTYyNTNcdTUzMDVcdTY2RjRcdTVGRUJcdUZGMENcdTRGNDZcdTY2MkZcdTRFMERcdTgwRkRcdTUzQkJcdTk2NjQgY29uc29sZS5sb2dcdUZGMEN0ZXJzZXJcdTYyNTNcdTUzMDVcdTYxNjJcdUZGMENcdTRGNDZcdTgwRkRcdTUzQkJcdTk2NjQgY29uc29sZS5sb2dcbiAgICAgIC8vIG1pbmlmeTogXCJ0ZXJzZXJcIixcbiAgICAgIC8vIHRlcnNlck9wdGlvbnM6IHtcbiAgICAgIC8vIFx0Y29tcHJlc3M6IHtcbiAgICAgIC8vIFx0XHRkcm9wX2NvbnNvbGU6IHZpdGVFbnYuVklURV9EUk9QX0NPTlNPTEUsXG4gICAgICAvLyBcdFx0ZHJvcF9kZWJ1Z2dlcjogdHJ1ZVxuICAgICAgLy8gXHR9XG4gICAgICAvLyB9LFxuICAgICAgc291cmNlbWFwOiBmYWxzZSxcbiAgICAgIC8vIFx1Nzk4MVx1NzUyOCBnemlwIFx1NTM4Qlx1N0YyOVx1NTkyN1x1NUMwRlx1NjJBNVx1NTQ0QVx1RkYwQ1x1NTNFRlx1NzU2NVx1NUZBRVx1NTFDRlx1NUMxMVx1NjI1M1x1NTMwNVx1NjVGNlx1OTVGNFxuICAgICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IGZhbHNlLFxuICAgICAgLy8gXHU4OUM0XHU1QjlBXHU4OUU2XHU1M0QxXHU4QjY2XHU1NDRBXHU3Njg0IGNodW5rIFx1NTkyN1x1NUMwRlxuICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAyMDAwLFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAvLyBTdGF0aWMgcmVzb3VyY2UgY2xhc3NpZmljYXRpb24gYW5kIHBhY2thZ2luZ1xuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiBcImFzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzXCIsXG4gICAgICAgICAgZW50cnlGaWxlTmFtZXM6IFwiYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanNcIixcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogXCJhc3NldHMvW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XVwiXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcd29ya3NwYWNlXFxcXHJlbGVhc2VcXFxcd2hpc3Blci12dWVcXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXHdvcmtzcGFjZVxcXFxyZWxlYXNlXFxcXHdoaXNwZXItdnVlXFxcXGJ1aWxkXFxcXGdldEVudi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovd29ya3NwYWNlL3JlbGVhc2Uvd2hpc3Blci12dWUvYnVpbGQvZ2V0RW52LnRzXCI7aW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0RldkZuKG1vZGU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiBtb2RlID09PSBcImRldmVsb3BtZW50XCI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1Byb2RGbihtb2RlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICByZXR1cm4gbW9kZSA9PT0gXCJwcm9kdWN0aW9uXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1Rlc3RGbihtb2RlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICByZXR1cm4gbW9kZSA9PT0gXCJ0ZXN0XCI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBXaGV0aGVyIHRvIGdlbmVyYXRlIHBhY2thZ2UgcHJldmlld1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzUmVwb3J0TW9kZSgpOiBib29sZWFuIHtcclxuICByZXR1cm4gcHJvY2Vzcy5lbnYuVklURV9SRVBPUlQgPT09IFwidHJ1ZVwiO1xyXG59XHJcblxyXG4vLyBSZWFkIGFsbCBlbnZpcm9ubWVudCB2YXJpYWJsZSBjb25maWd1cmF0aW9uIGZpbGVzIHRvIHByb2Nlc3MuZW52XHJcbmV4cG9ydCBmdW5jdGlvbiB3cmFwcGVyRW52KGVudkNvbmY6IFJlY29yZGFibGUpOiBWaXRlRW52IHtcclxuICBjb25zdCByZXQ6IGFueSA9IHt9O1xyXG5cclxuICBmb3IgKGNvbnN0IGVudk5hbWUgb2YgT2JqZWN0LmtleXMoZW52Q29uZikpIHtcclxuICAgIGxldCByZWFsTmFtZSA9IGVudkNvbmZbZW52TmFtZV0ucmVwbGFjZSgvXFxcXG4vZywgXCJcXG5cIik7XHJcbiAgICByZWFsTmFtZSA9IHJlYWxOYW1lID09PSBcInRydWVcIiA/IHRydWUgOiByZWFsTmFtZSA9PT0gXCJmYWxzZVwiID8gZmFsc2UgOiByZWFsTmFtZTtcclxuICAgIGlmIChlbnZOYW1lID09PSBcIlZJVEVfUE9SVFwiKSByZWFsTmFtZSA9IE51bWJlcihyZWFsTmFtZSk7XHJcbiAgICBpZiAoZW52TmFtZSA9PT0gXCJWSVRFX1BST1hZXCIpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICByZWFsTmFtZSA9IEpTT04ucGFyc2UocmVhbE5hbWUpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge31cclxuICAgIH1cclxuICAgIHJldFtlbnZOYW1lXSA9IHJlYWxOYW1lO1xyXG4gIH1cclxuICByZXR1cm4gcmV0O1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHVzZXIgcm9vdCBkaXJlY3RvcnlcclxuICogQHBhcmFtIGRpciBmaWxlIHBhdGhcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRSb290UGF0aCguLi5kaXI6IHN0cmluZ1tdKSB7XHJcbiAgcmV0dXJuIHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAuLi5kaXIpO1xyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcd29ya3NwYWNlXFxcXHJlbGVhc2VcXFxcd2hpc3Blci12dWVcXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXHdvcmtzcGFjZVxcXFxyZWxlYXNlXFxcXHdoaXNwZXItdnVlXFxcXGJ1aWxkXFxcXHByb3h5LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi93b3Jrc3BhY2UvcmVsZWFzZS93aGlzcGVyLXZ1ZS9idWlsZC9wcm94eS50c1wiO2ltcG9ydCB0eXBlIHsgUHJveHlPcHRpb25zIH0gZnJvbSBcInZpdGVcIjtcclxuXHJcbnR5cGUgUHJveHlJdGVtID0gW3N0cmluZywgc3RyaW5nXTtcclxuXHJcbnR5cGUgUHJveHlMaXN0ID0gUHJveHlJdGVtW107XHJcblxyXG50eXBlIFByb3h5VGFyZ2V0TGlzdCA9IFJlY29yZDxzdHJpbmcsIFByb3h5T3B0aW9ucz47XHJcblxyXG4vKipcclxuICogXHU1MjFCXHU1RUZBXHU0RUUzXHU3NDA2XHVGRjBDXHU3NTI4XHU0RThFXHU4OUUzXHU2NzkwIC5lbnYuZGV2ZWxvcG1lbnQgXHU0RUUzXHU3NDA2XHU5MTREXHU3RjZFXHJcbiAqIEBwYXJhbSBsaXN0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJveHkobGlzdDogUHJveHlMaXN0ID0gW10pIHtcclxuICBjb25zdCByZXQ6IFByb3h5VGFyZ2V0TGlzdCA9IHt9O1xyXG4gIGZvciAoY29uc3QgW3ByZWZpeCwgdGFyZ2V0XSBvZiBsaXN0KSB7XHJcbiAgICBjb25zdCBodHRwc1JFID0gL15odHRwczpcXC9cXC8vO1xyXG4gICAgY29uc3QgaXNIdHRwcyA9IGh0dHBzUkUudGVzdCh0YXJnZXQpO1xyXG5cclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9odHRwLXBhcnR5L25vZGUtaHR0cC1wcm94eSNvcHRpb25zXHJcbiAgICByZXRbcHJlZml4XSA9IHtcclxuICAgICAgdGFyZ2V0OiB0YXJnZXQsXHJcbiAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgd3M6IHRydWUsXHJcbiAgICAgIHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4ke3ByZWZpeH1gKSwgXCJcIiksXHJcbiAgICAgIC8vIGh0dHBzIGlzIHJlcXVpcmUgc2VjdXJlPWZhbHNlXHJcbiAgICAgIC4uLihpc0h0dHBzID8geyBzZWN1cmU6IGZhbHNlIH0gOiB7fSlcclxuICAgIH07XHJcbiAgfVxyXG4gIHJldHVybiByZXQ7XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFx3b3Jrc3BhY2VcXFxccmVsZWFzZVxcXFx3aGlzcGVyLXZ1ZVxcXFxidWlsZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcd29ya3NwYWNlXFxcXHJlbGVhc2VcXFxcd2hpc3Blci12dWVcXFxcYnVpbGRcXFxccGx1Z2lucy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovd29ya3NwYWNlL3JlbGVhc2Uvd2hpc3Blci12dWUvYnVpbGQvcGx1Z2lucy50c1wiO2ltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBQbHVnaW5PcHRpb24gfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiO1xyXG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSBcInJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclwiO1xyXG5pbXBvcnQgeyBjcmVhdGVIdG1sUGx1Z2luIH0gZnJvbSBcInZpdGUtcGx1Z2luLWh0bWxcIjtcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tIFwidml0ZS1wbHVnaW4tc3ZnLWljb25zXCI7XHJcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWUtanN4XCI7XHJcbmltcG9ydCBlc2xpbnRQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLWVzbGludFwiO1xyXG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiO1xyXG5pbXBvcnQgdnVlU2V0dXBFeHRlbmQgZnJvbSBcInVucGx1Z2luLXZ1ZS1zZXR1cC1leHRlbmQtcGx1cy92aXRlXCI7XHJcblxyXG4vKipcclxuICogXHU1MjFCXHU1RUZBIHZpdGUgXHU2M0QyXHU0RUY2XHJcbiAqIEBwYXJhbSB2aXRlRW52XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY3JlYXRlVml0ZVBsdWdpbnMgPSAodml0ZUVudjogVml0ZUVudik6IChQbHVnaW5PcHRpb24gfCBQbHVnaW5PcHRpb25bXSlbXSA9PiB7XHJcbiAgY29uc3QgeyBWSVRFX0dMT0JfQVBQX1RJVExFLCBWSVRFX1JFUE9SVCwgVklURV9QV0EgfSA9IHZpdGVFbnY7XHJcbiAgcmV0dXJuIFtcclxuICAgIHZ1ZSgpLFxyXG4gICAgLy8gdnVlIFx1NTNFRlx1NEVFNVx1NEY3Rlx1NzUyOCBqc3gvdHN4IFx1OEJFRFx1NkNENVxyXG4gICAgdnVlSnN4KCksXHJcbiAgICAvLyBlc0xpbnQgXHU2MkE1XHU5NTE5XHU0RkUxXHU2MDZGXHU2NjNFXHU3OTNBXHU1NzI4XHU2RDRGXHU4OUM4XHU1NjY4XHU3NTRDXHU5NzYyXHU0RTBBXHJcbiAgICBlc2xpbnRQbHVnaW4oKSxcclxuICAgIC8vIG5hbWUgXHU1M0VGXHU0RUU1XHU1MTk5XHU1NzI4IHNjcmlwdCBcdTY4MDdcdTdCN0VcdTRFMEFcclxuICAgIHZ1ZVNldHVwRXh0ZW5kKHt9KSxcclxuICAgIC8vIFx1NTIxQlx1NUVGQVx1NjI1M1x1NTMwNVx1NTM4Qlx1N0YyOVx1OTE0RFx1N0Y2RVxyXG4gICAgY3JlYXRlQ29tcHJlc3Npb24odml0ZUVudiksXHJcbiAgICAvLyBcdTZDRThcdTUxNjVcdTUzRDhcdTkxQ0ZcdTUyMzAgaHRtbCBcdTY1ODdcdTRFRjZcclxuICAgIGNyZWF0ZUh0bWxQbHVnaW4oe1xyXG4gICAgICBpbmplY3Q6IHtcclxuICAgICAgICBkYXRhOiB7IHRpdGxlOiBWSVRFX0dMT0JfQVBQX1RJVExFIH1cclxuICAgICAgfVxyXG4gICAgfSksXHJcbiAgICAvLyBcdTRGN0ZcdTc1Mjggc3ZnIFx1NTZGRVx1NjgwN1xyXG4gICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgICBpY29uRGlyczogW3Jlc29sdmUocHJvY2Vzcy5jd2QoKSwgXCJzcmMvYXNzZXRzL2ljb25zXCIpXSxcclxuICAgICAgc3ltYm9sSWQ6IFwiaWNvbi1bZGlyXS1bbmFtZV1cIlxyXG4gICAgfSksXHJcbiAgICAvLyB2aXRlUFdBXHJcbiAgICBWSVRFX1BXQSAmJiBjcmVhdGVWaXRlUHdhKHZpdGVFbnYpLFxyXG4gICAgLy8gXHU2NjJGXHU1NDI2XHU3NTFGXHU2MjEwXHU1MzA1XHU5ODg0XHU4OUM4XHVGRjBDXHU1MjA2XHU2NzkwXHU0RjlEXHU4RDU2XHU1MzA1XHU1OTI3XHU1QzBGXHU1MDVBXHU0RjE4XHU1MzE2XHU1OTA0XHU3NDA2XHJcbiAgICBWSVRFX1JFUE9SVCAmJiAodmlzdWFsaXplcih7IGZpbGVuYW1lOiBcInN0YXRzLmh0bWxcIiwgZ3ppcFNpemU6IHRydWUsIGJyb3RsaVNpemU6IHRydWUgfSkgYXMgUGx1Z2luT3B0aW9uKVxyXG4gIF07XHJcbn07XHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uIFx1NjgzOVx1NjM2RSBjb21wcmVzcyBcdTkxNERcdTdGNkVcdUZGMENcdTc1MUZcdTYyMTBcdTRFMERcdTU0MENcdTc2ODRcdTUzOEJcdTdGMjlcdTg5QzRcdTUyMTlcclxuICogQHBhcmFtIHZpdGVFbnZcclxuICovXHJcbmNvbnN0IGNyZWF0ZUNvbXByZXNzaW9uID0gKHZpdGVFbnY6IFZpdGVFbnYpOiBQbHVnaW5PcHRpb24gfCBQbHVnaW5PcHRpb25bXSA9PiB7XHJcbiAgY29uc3QgeyBWSVRFX0JVSUxEX0NPTVBSRVNTID0gXCJub25lXCIsIFZJVEVfQlVJTERfQ09NUFJFU1NfREVMRVRFX09SSUdJTl9GSUxFIH0gPSB2aXRlRW52O1xyXG4gIGNvbnN0IGNvbXByZXNzTGlzdCA9IFZJVEVfQlVJTERfQ09NUFJFU1Muc3BsaXQoXCIsXCIpO1xyXG4gIGNvbnN0IHBsdWdpbnM6IFBsdWdpbk9wdGlvbltdID0gW107XHJcblxyXG4gIGlmIChjb21wcmVzc0xpc3QuaW5jbHVkZXMoXCJnemlwXCIpKSB7XHJcbiAgICBwbHVnaW5zLnB1c2goXHJcbiAgICAgIHZpdGVDb21wcmVzc2lvbih7XHJcbiAgICAgICAgZXh0OiBcIi5nelwiLFxyXG4gICAgICAgIGFsZ29yaXRobTogXCJnemlwXCIsXHJcbiAgICAgICAgZGVsZXRlT3JpZ2luRmlsZTogVklURV9CVUlMRF9DT01QUkVTU19ERUxFVEVfT1JJR0lOX0ZJTEVcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGlmIChjb21wcmVzc0xpc3QuaW5jbHVkZXMoXCJicm90bGlcIikpIHtcclxuICAgIHBsdWdpbnMucHVzaChcclxuICAgICAgdml0ZUNvbXByZXNzaW9uKHtcclxuICAgICAgICBleHQ6IFwiLmJyXCIsXHJcbiAgICAgICAgYWxnb3JpdGhtOiBcImJyb3RsaUNvbXByZXNzXCIsXHJcbiAgICAgICAgZGVsZXRlT3JpZ2luRmlsZTogVklURV9CVUlMRF9DT01QUkVTU19ERUxFVEVfT1JJR0lOX0ZJTEVcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHJldHVybiBwbHVnaW5zO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvbiBWaXRlUHdhXHJcbiAqIEBwYXJhbSB2aXRlRW52XHJcbiAqL1xyXG5jb25zdCBjcmVhdGVWaXRlUHdhID0gKHZpdGVFbnY6IFZpdGVFbnYpOiBQbHVnaW5PcHRpb24gfCBQbHVnaW5PcHRpb25bXSA9PiB7XHJcbiAgY29uc3QgeyBWSVRFX0dMT0JfQVBQX1RJVExFIH0gPSB2aXRlRW52O1xyXG4gIHJldHVybiBWaXRlUFdBKHtcclxuICAgIHJlZ2lzdGVyVHlwZTogXCJhdXRvVXBkYXRlXCIsXHJcbiAgICBtYW5pZmVzdDoge1xyXG4gICAgICBuYW1lOiBWSVRFX0dMT0JfQVBQX1RJVExFLFxyXG4gICAgICBzaG9ydF9uYW1lOiBWSVRFX0dMT0JfQVBQX1RJVExFLFxyXG4gICAgICB0aGVtZV9jb2xvcjogXCIjZmZmZmZmXCIsXHJcbiAgICAgIGljb25zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgc3JjOiBcIi9sb2dvLnBuZ1wiLFxyXG4gICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxyXG4gICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgc3JjOiBcIi9sb2dvLnBuZ1wiLFxyXG4gICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxyXG4gICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgc3JjOiBcIi9sb2dvLnBuZ1wiLFxyXG4gICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxyXG4gICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICAgIHB1cnBvc2U6IFwiYW55IG1hc2thYmxlXCJcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH1cclxuICB9KTtcclxufTtcclxuIiwgIntcbiAgXCJuYW1lXCI6IFwid2hpc3Blci12dWVcIixcbiAgXCJwcml2YXRlXCI6IHRydWUsXG4gIFwidmVyc2lvblwiOiBcIjEuMC4xXCIsXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcImF1dGhvclwiOiB7XG4gICAgXCJuYW1lXCI6IFwieGF6aGFvXCIsXG4gICAgXCJlbWFpbFwiOiBcInhhemhhb0AxMjYuY29tXCIsXG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20veGF6aGFveFwiXG4gIH0sXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3hhemhhb3gvd2hpc3Blci12dWVcIixcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImdpdEBnaXRodWIuY29tOnhhemhhb3gvd2hpc3Blci12dWUuZ2l0XCJcbiAgfSxcbiAgXCJidWdzXCI6IHtcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS94YXpoYW94L3doaXNwZXItdnVlL2lzc3Vlc1wiXG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJkZXZcIjogXCJ2aXRlXCIsXG4gICAgXCJzZXJ2ZVwiOiBcInZpdGVcIixcbiAgICBcImJ1aWxkOmRldlwiOiBcInZ1ZS10c2MgJiYgdml0ZSBidWlsZCAtLW1vZGUgZGV2XCIsXG4gICAgXCJidWlsZDp1YXRcIjogXCJ2dWUtdHNjICYmIHZpdGUgYnVpbGQgLS1tb2RlIHVhdFwiLFxuICAgIFwiYnVpbGQ6cHJvZFwiOiBcInZ1ZS10c2MgJiYgdml0ZSBidWlsZCAtLW1vZGUgcHJvZFwiLFxuICAgIFwidHlwZTpjaGVja1wiOiBcInZ1ZS10c2MgLS1ub0VtaXQgLS1za2lwTGliQ2hlY2tcIixcbiAgICBcInByZXZpZXdcIjogXCJucG0gcnVuIGJ1aWxkOmRldiAmJiB2aXRlIHByZXZpZXdcIixcbiAgICBcImxpbnQ6ZXNsaW50XCI6IFwiZXNsaW50IC0tZml4IC0tZXh0IC5qcywudHMsLnZ1ZSAuL3NyY1wiLFxuICAgIFwibGludDpwcmV0dGllclwiOiBcInByZXR0aWVyIC0td3JpdGUgXFxcInNyYy8qKi8qLntqcyx0cyxqc29uLHRzeCxjc3MsbGVzcyxzY3NzLHZ1ZSxodG1sLG1kfVxcXCIgXFxcIioudHNcXFwiXCIsXG4gICAgXCJsaW50OnN0eWxlbGludFwiOiBcInN0eWxlbGludCAtLWNhY2hlIC0tZml4IFxcXCIqKi8qLnt2dWUsbGVzcyxwb3N0Y3NzLGNzcyxzY3NzfVxcXCIgLS1jYWNoZSAtLWNhY2hlLWxvY2F0aW9uIG5vZGVfbW9kdWxlcy8uY2FjaGUvc3R5bGVsaW50L1wiLFxuICAgIFwibGludDpsaW50LXN0YWdlZFwiOiBcImxpbnQtc3RhZ2VkXCIsXG4gICAgXCJwcmVwYXJlXCI6IFwiaHVza3kgaW5zdGFsbFwiLFxuICAgIFwicmVsZWFzZVwiOiBcInN0YW5kYXJkLXZlcnNpb25cIixcbiAgICBcImNvbW1pdFwiOiBcImdpdCBhZGQgLUEgJiYgY3pnICYmIGdpdCBwdXNoXCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGFudC1kZXNpZ24vaWNvbnMtdnVlXCI6IFwiXjcuMC4xXCIsXG4gICAgXCJAYW50di9nNlwiOiBcIl41LjAuMTBcIixcbiAgICBcIkBiZXR0ZXItc2Nyb2xsL2NvcmVcIjogXCJeMi41LjFcIixcbiAgICBcIkB2dWV1c2UvY29yZVwiOiBcIl4xMC4xMS4wXCIsXG4gICAgXCJAd2FuZ2VkaXRvci9lZGl0b3JcIjogXCJeNS4xLjIzXCIsXG4gICAgXCJAd2FuZ2VkaXRvci9lZGl0b3ItZm9yLXZ1ZVwiOiBcIl4xLjAuMlwiLFxuICAgIFwiYW50LWRlc2lnbi12dWVcIjogXCJeNC4yLjNcIixcbiAgICBcImF4aW9zXCI6IFwiXjEuNy4yXCIsXG4gICAgXCJjcnlwdG8tanNcIjogXCJeNC4yLjBcIixcbiAgICBcImRheWpzXCI6IFwiXjEuMTEuMTJcIixcbiAgICBcImRyaXZlci5qc1wiOiBcIl4xLjMuMVwiLFxuICAgIFwiZWNoYXJ0c1wiOiBcIl41LjUuMVwiLFxuICAgIFwiZWNoYXJ0cy1saXF1aWRmaWxsXCI6IFwiXjMuMS4wXCIsXG4gICAgXCJnbG9iYWxcIjogXCJeNC40LjBcIixcbiAgICBcImh0bWwyY2FudmFzXCI6IFwiXjEuNC4xXCIsXG4gICAgXCJqcy1tZDVcIjogXCJeMC44LjNcIixcbiAgICBcIm1pdHRcIjogXCJeMy4wLjFcIixcbiAgICBcIm5wcm9ncmVzc1wiOiBcIl4wLjIuMFwiLFxuICAgIFwicGluaWFcIjogXCJeMi4xLjdcIixcbiAgICBcInBpbmlhLXBsdWdpbi1wZXJzaXN0ZWRzdGF0ZVwiOiBcIl4zLjIuMVwiLFxuICAgIFwicHJpbnQtanNcIjogXCJeMS42LjBcIixcbiAgICBcInFzXCI6IFwiXjYuMTIuM1wiLFxuICAgIFwic29ydGFibGVqc1wiOiBcIl4xLjE1LjJcIixcbiAgICBcInZ1ZVwiOiBcIl4zLjQuMzNcIixcbiAgICBcInZ1ZS1pMThuXCI6IFwiXjkuMTMuMVwiLFxuICAgIFwidnVlLXJvdXRlclwiOiBcIl40LjQuMFwiLFxuICAgIFwidnVlZHJhZ2dhYmxlXCI6IFwiXjIuMjQuM1wiLFxuICAgIFwieWFyblwiOiBcIl4xLjIyLjIyXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGNvbW1pdGxpbnQvY2xpXCI6IFwiXjE5LjMuMFwiLFxuICAgIFwiQGNvbW1pdGxpbnQvY29uZmlnLWNvbnZlbnRpb25hbFwiOiBcIl4xOS4yLjJcIixcbiAgICBcIkB0eXBlcy9qcy1tZDVcIjogXCJeMC43LjJcIixcbiAgICBcIkB0eXBlcy9ucHJvZ3Jlc3NcIjogXCJeMC4yLjNcIixcbiAgICBcIkB0eXBlcy9xc1wiOiBcIl42LjkuMTVcIixcbiAgICBcIkB0eXBlcy9zb3J0YWJsZWpzXCI6IFwiXjEuMTUuOFwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNy4xNy4wXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjcuMTcuMFwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI6IFwiXjUuMC41XCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWUtanN4XCI6IFwiXjQuMC4wXCIsXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xOVwiLFxuICAgIFwiY3otZ2l0XCI6IFwiXjEuOS40XCIsXG4gICAgXCJjemdcIjogXCJeMS45LjRcIixcbiAgICBcImVzbGludFwiOiBcIl44LjU2LjBcIixcbiAgICBcImVzbGludC1jb25maWctcHJldHRpZXJcIjogXCJeOS4xLjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tcHJldHRpZXJcIjogXCJeNS4yLjFcIixcbiAgICBcImVzbGludC1wbHVnaW4tdnVlXCI6IFwiXjkuMjcuMFwiLFxuICAgIFwiaHVza3lcIjogXCJeOS4xLjFcIixcbiAgICBcImxpbnQtc3RhZ2VkXCI6IFwiXjE1LjIuN1wiLFxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuMzlcIixcbiAgICBcInBvc3Rjc3MtaHRtbFwiOiBcIl4xLjcuMFwiLFxuICAgIFwicHJldHRpZXJcIjogXCJeMy4zLjNcIixcbiAgICBcInJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclwiOiBcIl41LjEyLjBcIixcbiAgICBcInNhc3NcIjogXCJeMS43Ny44XCIsXG4gICAgXCJzdGFuZGFyZC12ZXJzaW9uXCI6IFwiXjkuNS4wXCIsXG4gICAgXCJzdHlsZWxpbnRcIjogXCJeMTYuNy4wXCIsXG4gICAgXCJzdHlsZWxpbnQtY29uZmlnLWh0bWxcIjogXCJeMS4xLjBcIixcbiAgICBcInN0eWxlbGludC1jb25maWctcmVjZXNzLW9yZGVyXCI6IFwiXjUuMC4xXCIsXG4gICAgXCJzdHlsZWxpbnQtY29uZmlnLXJlY29tbWVuZGVkLXNjc3NcIjogXCJeMTQuMS4wXCIsXG4gICAgXCJzdHlsZWxpbnQtY29uZmlnLXJlY29tbWVuZGVkLXZ1ZVwiOiBcIl4xLjUuMFwiLFxuICAgIFwic3R5bGVsaW50LWNvbmZpZy1zdGFuZGFyZFwiOiBcIl4zNi4wLjFcIixcbiAgICBcInN0eWxlbGludC1jb25maWctc3RhbmRhcmQtc2Nzc1wiOiBcIl4xMy4xLjBcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS41LjRcIixcbiAgICBcInVucGx1Z2luLWljb25zXCI6IFwiXjAuMTkuMFwiLFxuICAgIFwidW5wbHVnaW4tdnVlLXNldHVwLWV4dGVuZC1wbHVzXCI6IFwiXjEuMC4xXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuMy40XCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiOiBcIl4wLjUuMVwiLFxuICAgIFwidml0ZS1wbHVnaW4tZXNsaW50XCI6IFwiXjEuOC4xXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1odG1sXCI6IFwiXjMuMi4yXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1wd2FcIjogXCJeMC4yMC4wXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjogXCJeMi4wLjFcIixcbiAgICBcInZ1ZS10c2NcIjogXCJeMi4wLjI0XCJcbiAgfSxcbiAgXCJlbmdpbmVzXCI6IHtcbiAgICBcIm5vZGVcIjogXCI+PTE2LjAuMFwiXG4gIH0sXG4gIFwiYnJvd3NlcnNsaXN0XCI6IHtcbiAgICBcInByb2R1Y3Rpb25cIjogW1xuICAgICAgXCI+IDElXCIsXG4gICAgICBcIm5vdCBkZWFkXCIsXG4gICAgICBcIm5vdCBvcF9taW5pIGFsbFwiXG4gICAgXSxcbiAgICBcImRldmVsb3BtZW50XCI6IFtcbiAgICAgIFwibGFzdCAxIGNocm9tZSB2ZXJzaW9uXCIsXG4gICAgICBcImxhc3QgMSBmaXJlZm94IHZlcnNpb25cIixcbiAgICAgIFwibGFzdCAxIHNhZmFyaSB2ZXJzaW9uXCJcbiAgICBdXG4gIH0sXG4gIFwiY29uZmlnXCI6IHtcbiAgICBcImNvbW1pdGl6ZW5cIjoge1xuICAgICAgXCJwYXRoXCI6IFwibm9kZV9tb2R1bGVzL2N6LWdpdFwiXG4gICAgfVxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBSLFNBQVMsY0FBYyxlQUFzQztBQUN2VixTQUFTLFdBQUFBLGdCQUFlOzs7QUNxQmpCLFNBQVMsV0FBVyxTQUE4QjtBQUN2RCxRQUFNLE1BQVcsQ0FBQztBQUVsQixhQUFXLFdBQVcsT0FBTyxLQUFLLE9BQU8sR0FBRztBQUMxQyxRQUFJLFdBQVcsUUFBUSxPQUFPLEVBQUUsUUFBUSxRQUFRLElBQUk7QUFDcEQsZUFBVyxhQUFhLFNBQVMsT0FBTyxhQUFhLFVBQVUsUUFBUTtBQUN2RSxRQUFJLFlBQVksWUFBYSxZQUFXLE9BQU8sUUFBUTtBQUN2RCxRQUFJLFlBQVksY0FBYztBQUM1QixVQUFJO0FBQ0YsbUJBQVcsS0FBSyxNQUFNLFFBQVE7QUFBQSxNQUNoQyxTQUFTLE9BQU87QUFBQSxNQUFDO0FBQUEsSUFDbkI7QUFDQSxRQUFJLE9BQU8sSUFBSTtBQUFBLEVBQ2pCO0FBQ0EsU0FBTztBQUNUOzs7QUN6Qk8sU0FBUyxZQUFZLE9BQWtCLENBQUMsR0FBRztBQUNoRCxRQUFNLE1BQXVCLENBQUM7QUFDOUIsYUFBVyxDQUFDLFFBQVEsTUFBTSxLQUFLLE1BQU07QUFDbkMsVUFBTSxVQUFVO0FBQ2hCLFVBQU0sVUFBVSxRQUFRLEtBQUssTUFBTTtBQUduQyxRQUFJLE1BQU0sSUFBSTtBQUFBLE1BQ1o7QUFBQSxNQUNBLGNBQWM7QUFBQSxNQUNkLElBQUk7QUFBQSxNQUNKLFNBQVMsVUFBUSxLQUFLLFFBQVEsSUFBSSxPQUFPLElBQUksTUFBTSxFQUFFLEdBQUcsRUFBRTtBQUFBO0FBQUEsTUFFMUQsR0FBSSxVQUFVLEVBQUUsUUFBUSxNQUFNLElBQUksQ0FBQztBQUFBLElBQ3JDO0FBQUEsRUFDRjtBQUNBLFNBQU87QUFDVDs7O0FDN0JzUyxTQUFTLGVBQWU7QUFFOVQsU0FBUyxlQUFlO0FBQ3hCLFNBQVMs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
