<template>
  <div>
    <div class="card mb10">
      <h4 class="title">简介</h4>
      <span class="text">
        <a-link type="primary" href="https://docs.spicyboy.cn" target="_blank">whisper-Admin</a-link>
        一款基于 Vue3.4、TypeScript、Vite5、Pinia、Element-Plus 开源的后台管理框架，使用目前最新技术栈开发。项目提供强大的
        <a-link type="primary" href="https://juejin.cn/post/7166068828202336263" target="_blank">ProTable 组件</a-link>
        在一定程度上提高您的开发效率。另外本项目还封装了一些常用组件、Hooks、指令、动态路由、按钮级别权限控制等功能。
      </span>
    </div>
    <div class="card mb10">
      <h4 class="title">项目信息</h4>
      <a-descriptions :column="2" border>
        <a-descriptions-item label="版本号" label-align="left">
          <a-tag>{{ version }}</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="发布时间" label-align="left">
          <a-tag>{{ lastBuildTime }}</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="Gitee" label-align="left">
          <a-link type="primary" href="https://gitee.com/HalseySpicy/whisper-Admin" target="_blank"> Gitee </a-link>
        </a-descriptions-item>
        <a-descriptions-item label="Github" label-align="left">
          <a-link type="primary" href="https://github.com/HalseySpicy/whisper-Admin" target="_blank"> Github </a-link>
        </a-descriptions-item>
        <a-descriptions-item label="文档地址" label-align="left">
          <a-link type="primary" href="https://docs.spicyboy.cn" target="_blank"> 文档地址 </a-link>
        </a-descriptions-item>
        <a-descriptions-item label="预览地址" label-align="left">
          <a-link type="primary" href="https://admin.spicyboy.cn" target="_blank"> 预览地址 </a-link>
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <div class="card mb10">
      <h4 class="title">生产环境依赖</h4>
      <a-descriptions :column="3" border>
        <a-descriptions-item v-for="(value, key) in dependencies" :key="key" width="400px" :label="key">
          <a-tag type="info">
            {{ value }}
          </a-tag>
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <div class="card">
      <h4 class="title">开发环境依赖</h4>
      <a-descriptions :column="3" border>
        <a-descriptions-item v-for="(value, key) in devDependencies" :key="key" width="400px" :label="key">
          <a-tag type="info">
            {{ value }}
          </a-tag>
        </a-descriptions-item>
      </a-descriptions>
    </div>
  </div>
</template>

<script setup lang="ts" name="about">
const { pkg, lastBuildTime } = __APP_INFO__;
const { dependencies, devDependencies, version } = pkg;
</script>

<style lang="scss" scoped>
.card {
  .title {
    margin: 0 0 15px;
    font-size: 17px;
    font-weight: bold;
    color: var(--el-text-color-primary);
  }
  .text {
    font-size: 15px;
    line-height: 25px;
    color: var(--el-text-color-regular);
    .el-link {
      font-size: 15px;
    }
  }
}
</style>
