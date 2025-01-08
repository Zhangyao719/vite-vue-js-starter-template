<template>
  <!-- 烟花特效 -->
  <div class="fixed top-0 flex justify-between">
    <img
      class="w-30%"
      src="https://pic.snsboat.com/saas/normal/customer/61/15607/X77bXJ5EY6QZ8Pis5R5kQ/2024/4/16/4fa93a852d6171ddf5775875e00fb07d.gif"
      alt=""
    />
    <img
      class="w-30%"
      src="https://pic.snsboat.com/saas/normal/customer/61/15607/X77bXJ5EY6QZ8Pis5R5kQ/2024/4/16/4fa93a852d6171ddf5775875e00fb07d.gif"
      alt=""
    />
  </div>

  <!-- 中奖名单 -->
  <div class="zoom-in-down min-h-400px max-h-75% px-5% mb-30px overflow-y-auto scrollbar">
    <ul class="flex flex-wrap justify-center">
      <li v-for="user in pool" :key="user.id" class="flex-shrink-0 flex-basis-160px mb-6">
        <!-- 头像 -->
        <div
          class="bg-no-repeat bg-contain bg-center rounded-1/2 overflow-hidden w-100px h-100px mx-center"
          :style="{ backgroundImage: `url(${user.avatar})` }"
        >
          <!-- 动态头像框 -->
          <img
            class="avatar-rotate w-full h-full"
            src="https://pic.snsboat.com/saas/normal/customer/61/15607/X77bXJ5EY6QZ8Pis5R5kQ/2024/4/16/55fefd5d1efca0f25371cbe0f91886ec.png?v=51&imageMogr2/0/w/3000"
            alt=""
          />
        </div>
        <span class="text-#fff176 text-sm font-bold">{{ user.nickname }}</span>
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
  Array.from({ length: 3 }, (_, index) => ({
    id: index,
    nickname: '阿斯蒂芬拿到',
    avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
  })),
);
</script>

<style scoped lang="less">
@import url('@/style/mixin.less');

.zoom-in-down {
  animation-name: zoomInDown;
  animation-fill-mode: both;
  animation-duration: 1s;
}

.avatar-rotate {
  animation: rotate 5s linear infinite;
}
</style>
