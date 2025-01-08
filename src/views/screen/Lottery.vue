<template>
  <section class="h-full text-center relative">
    <span class="absolute text-#fff176 text-[30px] font-bold left-1/2 -translate-x-1/2">
      {{ prizeInfo.label ?? '' }}
    </span>
    <img
      src="https://pic.snsboat.com/saas/normal/customer/61/15607/X77bXJ5EY6QZ8Pis5R5kQ/2024/4/16/75c169b82a471d64c2462d54b9147588.png?v=51&imageMogr2/auto-orient/ignore-error/1"
      alt=""
    />

    <!-- 抽奖部分 -->
    <component :is="activeTab.component"></component>

    <!-- 操作按钮 -->
    <t-button
      block
      class="operation w-200px!"
      style="margin: 0 auto"
      shape="round"
      size="large"
      :disabled="disabled"
      @click="handleClick(activeTab.component)"
    >
      {{ activeTab.label }}
    </t-button>
  </section>
</template>

<script setup>
import { ref, inject, computed } from 'vue';
import Start from './components/LotteryStart.vue';
import Loading from './components/LotteryLoading.vue';
import Result from './components/LotteryResult.vue';
import { LotteryConfig, MusicConfig } from './constant';
import useMusic from '@/hooks/useMusic';

defineOptions({
  name: 'Lottery',
  components: {
    Start,
    Loading,
    Result,
  },
});

const { selectMusic } = useMusic();

const prizeInfo = inject('prizeInfo');
const disabled = computed(() => !prizeInfo.value?.value || !prizeInfo.value?.num);

// 当前的抽奖环节
const activeTab = ref(LotteryConfig.Start);
const handleClick = (tab) => {
  switch (tab) {
    case LotteryConfig.Start.component:
      // 1. 开始抽奖 → 抽奖中
      // todo: 发送抽奖请求
      console.log(prizeInfo.value);
      activeTab.value = LotteryConfig.Loading;
      selectMusic(MusicConfig.Loading);
      break;
    case LotteryConfig.Loading.component:
      // 2. 抽奖中 → 抽奖结果
      activeTab.value = LotteryConfig.Result;
      selectMusic(MusicConfig.Result);
      break;
    case LotteryConfig.Result.component:
      //  3. 抽奖结果 → 返回开始抽奖
      activeTab.value = LotteryConfig.Start;
      selectMusic(MusicConfig.Start);
      break;
    default:
      break;
  }
};

onMounted(() => {
  selectMusic(MusicConfig.Start);
});
</script>

<style scoped lang="less">
@color: linear-gradient(to right, #fe2203, #fe8906);
@transparent: transparent;

.operation {
  background: @color;
  border-color: @transparent;

  &.t-is-disabled,
  &:hover {
    border-color: @transparent;
  }

  & > :deep(div > div) {
    background: @color !important;
  }
}
</style>
