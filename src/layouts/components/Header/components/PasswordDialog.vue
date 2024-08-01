<template>
  <a-modal v-model="dialogVisible" title="修改密码" width="500px" draggable>
    <span>This is Password</span>
    <template #footer>
      <span class="dialog-footer">
        <a-button @click="dialogVisible = false">取消</a-button>
        <a-button type="primary" @click="dialogVisible = false">确认</a-button>
      </span>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";

const dialogVisible = ref(false);
const openDialog = () => {
  dialogVisible.value = true;
};

defineExpose({ openDialog });
</script>
