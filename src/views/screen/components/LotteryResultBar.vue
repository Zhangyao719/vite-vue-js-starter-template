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
    <ul class="grid grid-cols-2 gap-x-1% gap-y-1%">
      <li
        v-for="(user, index) in winningUsers"
        :key="index"
        class="bar h-6vh line-height-6vh bg-[length:100%_100%] bg-no-repeat flex justify-around text-3.5vh"
      >
        <span class="w-33.3% font-bold">{{ user.nickname }}</span>
        <span class="flex-grow-1 font-bold">{{ user.workname }}</span>
        <span class="flex-grow-1 font-bold">{{ user.mobile }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { inject } from 'vue';

defineOptions({
  name: 'LotteryResultBar',
});

const { winningUsers } = inject('winningUsers');
</script>

<style scoped lang="less">
@import url('@/style/mixin.less');

.zoom-in-down {
  animation-name: zoomInDown;
  animation-fill-mode: both;
  animation-duration: 1s;
}

.bar {
  background-image: url('../../../assets/imgs/bar.png');
}
</style>
