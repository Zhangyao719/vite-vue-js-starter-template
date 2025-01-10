<template>
  <ul class="w-60% m-[0_auto] mb-30px gap-col-4">
    <li
      v-for="(user, index) in pool"
      :key="index"
      class="bar first:mt-0 h-7vh line-height-7vh bg-[length:100%_100%] bg-no-repeat flex justify-around text-3.6vh mt-0.5%"
    >
      <span class="w-33.3% font-bold">{{ user.nickname }}</span>
      <span class="flex-grow-1 font-bold">{{ user.workNum }}</span>
      <span class="flex-grow-1 font-bold">{{ user.dept }}</span>
    </li>
  </ul>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { useUserStore } from '@/store/modules/user.js';

defineOptions({
  name: 'LotteryLoadingBar',
});

//#region 抽奖池
const userStore = useUserStore();
const pool = ref([]);
const setPool = () => {
  pool.value = userStore.getRandomOutdoorUsers();
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

<style scoped>
.bar {
  background-image: url('../../../assets/imgs/bar.png');
}
</style>
