<template>
  <!-- <ul class="grid h-400px overflow-y-scroll bg-slate-100/[0.2]"> -->
  <ul class="pool grid grid-cols-10 px-5% mb-30px">
    <!-- 过渡效果，固定 30 个位置 -->
    <li v-for="user in pool" :key="user.id" class="inline-flex flex-col justify-center items-center">
      <div class="avatar w-112px h-112px relative">
        <img
          class="rounded-50% absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          width="90%"
          height="90%"
          :src="user.avatar"
          alt=""
        />
      </div>
      <span class="text-#fff176 text-sm">{{ user.nickname }}</span>
    </li>
  </ul>
</template>

<script setup>
import { inject } from 'vue';

defineOptions({
  name: 'LotteryLoading',
});

const prizeInfo = inject('prizeInfo');

const pool = ref(
  Array.from({ length: 30 }, (_, index) => ({
    id: index,
    nickname: '阿斯蒂芬拿到',
    avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
  })),
);
</script>

<style scoped lang="less">
.pool {
  grid-row-gap: 20px;
}

.avatar {
  background-image: url('https://pic.snsboat.com/saas/normal/customer/61/15607/X77bXJ5EY6QZ8Pis5R5kQ/2024/4/16/55fefd5d1efca0f25371cbe0f91886ec.png?v=51&imageMogr2/auto-orient/ignore-error/1');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
