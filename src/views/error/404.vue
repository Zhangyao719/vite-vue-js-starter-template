<template>
  <t-empty class="pt-20%!" title="系统提示" description="当前页面不存在">
    <template #image> <NotFoundSvg /> </template>
  </t-empty>
</template>

<script setup>
import NotFoundSvg from '@/assets/svg/404.svg';

defineOptions({
  name: '404',
});
</script>

<style scoped></style>
