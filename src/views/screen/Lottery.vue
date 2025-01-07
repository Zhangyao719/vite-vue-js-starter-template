<template>
  <section class="h-full text-center relative pt-20px">
    <span class="absolute text-#fff176 text-[30px] font-bold left-1/2 -translate-x-1/2">{{ level }}</span>
    <img
      src="https://pic.snsboat.com/saas/normal/customer/61/15607/X77bXJ5EY6QZ8Pis5R5kQ/2024/4/16/75c169b82a471d64c2462d54b9147588.png?v=51&imageMogr2/auto-orient/ignore-error/1"
      alt=""
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'Lottery',
});

const level = ref('三 等 奖');
</script>

<style scoped></style>
