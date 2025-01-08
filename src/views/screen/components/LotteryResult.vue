<template>
  <!-- 烟花特效 -->
  <div class="fixed top-0 flex justify-between">
    <img
      width="30%"
      src="https://pic.snsboat.com/saas/normal/customer/61/15607/X77bXJ5EY6QZ8Pis5R5kQ/2024/4/16/4fa93a852d6171ddf5775875e00fb07d.gif"
      alt=""
    />
    <img
      width="30%"
      src="https://pic.snsboat.com/saas/normal/customer/61/15607/X77bXJ5EY6QZ8Pis5R5kQ/2024/4/16/4fa93a852d6171ddf5775875e00fb07d.gif"
      alt=""
    />
  </div>

  <!-- 中奖名单 -->
  <div class="zoom-in-down min-h-500px px-5% mb-30px bg-slate-100/[0.5]">
    <ul class="flex flex-wrap justify-center">
      <li v-for="user in pool" :key="user.id" class="flex-shrink-0 flex-basis-160px">
        <!-- 头像框 -->
        <img
          class="avatar-rotate"
          src="https://pic.snsboat.com/saas/normal/customer/61/15607/X77bXJ5EY6QZ8Pis5R5kQ/2024/4/16/55fefd5d1efca0f25371cbe0f91886ec.png?v=51&imageMogr2/0/w/3000"
          alt=""
        />
        <!-- class="flex-1 w-full min-w-120px h-150px flex-center flex-col bg-blue-100/[0.5]" -->
        <!-- <div class="avatar w-full h-full relative">
          <img
            class="rounded-50% absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            width="90%"
            height="90%"
            :src="user.avatar"
            alt=""
          />
        </div>
        <span class="text-#fff176 text-sm">{{ user.nickname }}</span> -->
      </li>
    </ul>
  </div>
</template>

<script setup>
import {} from 'vue';

defineOptions({
  name: 'LotteryResult',
});

const pool = ref(
  Array.from({ length: 30 }, (_, index) => ({
    id: index,
    nickname: '阿斯蒂芬拿到',
    avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
  })),
);
</script>

<style scoped lang="less">
@import '@/style/mixin.less';

.zoom-in-down {
  animation-name: zoomInDown;
  animation-fill-mode: both;
  animation-duration: 1s;
}

.avatar-rotate {
  animation: rotate 5s linear infinite;
}
</style>
