<template>
  <div class="h-full w-full relative flex flex-col items-center">
    <div class="absolute top-35%">
      <div class="flex items-center">
        <img class="mr-3" src="@/assets/imgs/wechat.png" width="55" height="auto" alt="" />
        <icon-font name="swap" size="1rem" />
        <img class="ml-3" src="@/assets/imgs/logo.png" width="50" height="auto" alt="" />
      </div>
      <t-button class="w-100% mt-4!" theme="success" @click="authorize">微信授权</t-button>
    </div>

    <p class="copyright absolute text-gray-400">Copyright ©2025-恒科信息部</p>
  </div>
</template>

<script setup lang="ts">
import { IconFont } from 'tdesign-icons-vue-next';
import { authorize } from '@/utils/authorize';

defineOptions({
  name: 'Authorize',
});
</script>

<style scoped lang="less">
.copyright {
  bottom: 2rem;
}
</style>
