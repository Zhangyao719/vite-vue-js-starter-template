<template>
  <!-- <ul class="grid h-400px overflow-y-scroll bg-slate-100/[0.2]"> -->
  <ul class="pool grid grid-cols-10 px-5% mb-30px">
    <!-- 过渡效果，固定 30 个位置 -->
    <li v-for="user in pool" :key="user.id" class="inline-flex flex-col justify-center items-center">
      <div class="avatar w-112px h-112px relative">
        <img class="absolute-center object-fill w-90% h-90% rounded-50%" :src="user.headimgurl" alt="" />
      </div>
      <span class="text-#fff176 text-sm">{{ user.nickname }}</span>
    </li>
  </ul>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { useUserStore } from '@/store/modules/user.js';

defineOptions({
  name: 'LotteryLoading',
});

//#region 抽奖池
const userStore = useUserStore();
const pool = ref([]);
const setPool = () => {
  pool.value = userStore.getRandomUsers();
};
const timer = ref(null);
onBeforeMount(() => {
  timer.value = setInterval(() => {
    setPool();
  }, 200);
});
onBeforeUnmount(() => {
  if (timer.value) clearInterval(timer.value);
});
//#endregion
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
