<template>
  <a-dropdown trigger="click" placement="bottomRight">
    <div class="avatar">
      <img src="@/assets/images/avatar.jpg" alt="avatar" />
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item @click="openDialog('infoRef')">
          <UserOutlined />
          {{ $t("header.personalData") }}
        </a-menu-item>
        <a-menu-item @click="openDialog('passwordRef')">
          <FormOutlined />
          {{ $t("header.changePassword") }}
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item divided @click="logout">
          <ExclamationCircleOutlined />
          {{ $t("header.logout") }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <!-- infoDialog -->
  <InfoDialog ref="infoRef"></InfoDialog>
  <!-- passwordDialog -->
  <PasswordDialog ref="passwordRef"></PasswordDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { LOGIN_URL } from "@/config";
import { useRouter } from "vue-router";
import { logoutApi } from "@/api/modules/login";
import { useUserStore } from "@/stores/modules/user";
import { Modal, message } from "ant-design-vue";
import InfoDialog from "./InfoDialog.vue";
import PasswordDialog from "./PasswordDialog.vue";
import { UserOutlined, FormOutlined, ExclamationCircleOutlined } from "@ant-design/icons-vue";

const router = useRouter();
const userStore = useUserStore();

// 退出登录
const logout = () => {
  Modal.confirm({
    title: "温馨提示",
    content: "您是否确认退出登录?",
    okText: "确定",
    cancelText: "取消",
    onOk() {
      // 1.执行退出登录接口
      logoutApi();

      // 2.清除 Token
      userStore.setToken("");

      // 3.重定向到登陆页
      router.replace(LOGIN_URL);
      message.success("退出登录成功！");
    }
  });
};

// 打开修改密码和个人信息弹窗
const infoRef = ref<InstanceType<typeof InfoDialog> | null>(null);
const passwordRef = ref<InstanceType<typeof PasswordDialog> | null>(null);
const openDialog = (ref: string) => {
  console.log(ref);
  if ("infoRef" == ref) {
    message.success("个人信息暂未开发！");
  }
  if (ref == "passwordRef") {
    message.success("修改密码暂未开发！");
  }
};
</script>

<style scoped lang="scss">
.avatar {
  width: 40px;
  height: 40px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
    vertical-align: baseline;
  }
}
</style>
